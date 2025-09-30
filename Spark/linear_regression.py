import os
from pyspark.ml import Pipeline
from pyspark.sql import *
from pyspark.ml.feature import VectorAssembler, StringIndexer, OneHotEncoder
from pyspark.ml.regression import LinearRegression
from pyspark.ml.evaluation import RegressionEvaluator

output_folder = "../Spark_output"

dataset_folder = "../dataset"
if not os.path.exists(dataset_folder):
    print("Dataset folder nije kreiran")

dataset_file = os.path.join(dataset_folder, "deliverytime_analyzed.csv")
if not os.path.exists(dataset_file):
    print("Dataset ne postoji")

spark = SparkSession.builder.appName("FoodDelivery_Regression").getOrCreate()

df = spark.read.csv(dataset_file, header=True, inferSchema=True)

numeric_columns = ["Delivery_person_Age", "Delivery_person_Ratings", "distance"]
category_columns = ["Type_of_order", "Type_of_vehicle"]
target_column = "Time_taken(min)"
stages = []

for category in category_columns:
    indexer = StringIndexer(inputCol=category, outputCol=category + "_indexed")
    encoder = OneHotEncoder(inputCol=category + "_indexed", outputCol=category + "_encoded")
    stages += [indexer, encoder]

assembler_inputs = numeric_columns + [c + "_encoded" for c in category_columns]
assembler = VectorAssembler(inputCols=assembler_inputs, outputCol="features")
stages.append(assembler)

lr = LinearRegression(featuresCol="features", labelCol=target_column)
stages.append(lr)

pipeline = Pipeline(stages=stages)

train_df, test_df = df.randomSplit([0.8, 0.2])

lr_model = pipeline.fit(df)

lr_model.write().overwrite().save("../Spark_output/linear_regression_model")

train_pred = lr_model.transform(train_df)
test_pred = lr_model.transform(test_df)
df_predictions = lr_model.transform(df)

evaluator_rmse = RegressionEvaluator(labelCol=target_column, predictionCol="prediction", metricName="rmse")
evaluator_r2 = RegressionEvaluator(labelCol=target_column, predictionCol="prediction", metricName="r2")

rmse_train = evaluator_rmse.evaluate(train_pred)
r2_train = evaluator_r2.evaluate(train_pred)

rmse_test = evaluator_rmse.evaluate(test_pred)
r2_test = evaluator_r2.evaluate(test_pred)

print(f"\n--- Rezultati linearnog modela ---")
print(f"Train RMSE: {rmse_train:.2f}, R^2: {r2_train:.3f}")
print(f"Test  RMSE: {rmse_test:.2f}, R^2: {r2_test:.3f}")

print("\n--- Prvih 5 redova nakon predikcije linearne regresije ---")
df_predictions.show(5)

df_export = df_predictions.drop("features","Type_of_order_indexed","Type_of_order_encoded",
                                "Type_of_vehicle_indexed","Type_of_vehicle_encoded")
df_pd = df_export.toPandas()

csv_path = os.path.join(output_folder, "linear_regression_results.csv")
df_pd.to_csv(csv_path, index=False)

spark.stop()