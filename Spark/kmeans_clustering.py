from pyspark.sql import *
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.clustering import KMeans
from pyspark.ml.evaluation import ClusteringEvaluator
import os

output_folder = "../Spark_output"

dataset_file = r"D:\faks\OVSP_projekat\dataset\deliverytime_analyzed.csv"

spark = SparkSession.builder.appName("FoodDelivery_KMeans").getOrCreate()

df = spark.read.csv(dataset_file, header=True, inferSchema=True)

feature_columns = ["Restaurant_latitude", "Restaurant_longitude",
                   "Delivery_location_latitude", "Delivery_location_longitude",]

assembler = VectorAssembler(inputCols=feature_columns, outputCol="features")
df_features = assembler.transform(df).select("features", *df.columns)

kmeans = KMeans(featuresCol="features", predictionCol="cluster", k=5)
kmeans_model = kmeans.fit(df_features)

kmeans_model.write().overwrite().save("../Spark_output/kmeans_model")

df_clustered = kmeans_model.transform(df_features)

evaluator = ClusteringEvaluator(predictionCol="cluster", featuresCol="features",
                                metricName="silhouette", distanceMeasure="squaredEuclidean")
silhouette = evaluator.evaluate(df_clustered)
print(f"\nSilhouette skor: {silhouette}")

print("\n --- DataFrame nakon KMeans algoritma ---")
df_clustered.show(5)

print("\n --- Broj porudzbina po klasteru ---")
df_clustered.groupBy("cluster").count().show()

df_export = df_clustered.drop("features")
df_pd = df_export.toPandas()

csv_path = os.path.join(output_folder, "kmeans_clusters.csv")
df_pd.to_csv(csv_path, index=False)

print(f"Kmeans rezultat je sacuvan u {csv_path}")

spark.stop()