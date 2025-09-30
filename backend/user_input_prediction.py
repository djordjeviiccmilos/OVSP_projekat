from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit, sqrt, pow
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.regression import LinearRegression
import json

spark = SparkSession.builder.appName("UserInputPrediction").getOrCreate()

dataset_path = r"D:\faks\OVSP_projekat\dataset\deliverytime_analyzed.csv"
df = spark.read.csv(dataset_path, header=True, inferSchema=True)

# Assembler za regresiju
assembler_lr = VectorAssembler(
    inputCols=["Restaurant_latitude", "Restaurant_longitude",
               "Delivery_location_latitude", "Delivery_location_longitude"],
    outputCol="features"
)
df_lr = assembler_lr.transform(
    df.withColumn("Delivery_location_latitude", lit(df.first()["Delivery_location_latitude"]))
      .withColumn("Delivery_location_longitude", lit(df.first()["Delivery_location_longitude"]))
)

lr = LinearRegression(featuresCol="features", labelCol="Time_taken(min)")
lr_model = lr.fit(df_lr)


def predict_user_delivery_json(user_lat, user_lon, top_n=10):
    user_df = df.withColumn("Delivery_location_latitude", lit(user_lat)) \
                .withColumn("Delivery_location_longitude", lit(user_lon))

    user_df = user_df.withColumn(
        "distance",
        sqrt(
            pow(col("Restaurant_latitude") - lit(user_lat), 2) +
            pow(col("Restaurant_longitude") - lit(user_lon), 2)
        )
    )

    df_near = user_df.dropDuplicates(["Restaurant_latitude", "Restaurant_longitude"]) \
                     .orderBy(col("distance").asc()) \
                     .limit(top_n)

    df_near = assembler_lr.transform(df_near)
    df_prediction = lr_model.transform(df_near)

    near_restaurants = df_prediction.select(
        "Restaurant_latitude", "Restaurant_longitude", col("prediction").alias("predicted_time")
    )

    result_json = json.dumps([{
          "lat": row["Restaurant_latitude"],
          "lon": row["Restaurant_longitude"],
          "predicted_time": row["predicted_time"]
    } for row in near_restaurants.collect()])

    return result_json


print(predict_user_delivery_json(12.012505, 24.250159))