from pyspark.sql import *
from pyspark.sql.functions import *
import os


dataset_folder = "../dataset"
if not os.path.exists(dataset_folder):
    print("Dataset folder nije kreiran")

dataset_file = os.path.join(dataset_folder, "deliverytime.csv")
if not os.path.exists(dataset_file):
    print("Dataset ne postoji")

spark = SparkSession.builder.appName("FoodDeliveryAnalysis").getOrCreate()

df = spark.read.csv(dataset_file, header=True, inferSchema=True)

print("\n--- Šema podataka ---")
df.printSchema()

print("\n--- Prvih 5 redova u tabeli ---")
df.show(5)

print("\n--- Broj null vrednosti po kolonama ---")
df.select([sum(col(c).isNull().cast("int")).alias(c) for c in df.columns]).show()

print("\n--- Deskriptivna statistika za numericke kolone ---")
numeric_columns = ["Delivery_person_Age", "Delivery_person_Ratings",
                   "Restaurant_latitude", "Restaurant_longitude",
                   "Delivery_location_latitude", "Delivery_location_longitude"]

df.select(numeric_columns).describe().show()

print("\n --- Broj restorana po koordinatama ---")
br_restorana = df.select("Restaurant_latitude", "Restaurant_longitude").distinct().count()
print(f"\n{br_restorana}")

print("\n --- Broj lokacija dostave po koordinatama ---")
br_lokacija_dostave = df.select("Delivery_location_latitude", "Delivery_location_longitude").distinct().count()
print(f"\n{br_lokacija_dostave}")

print("\n--- Broj porudzbina po tipu porudzbine ---")
df.groupBy("Type_of_order").count().orderBy(desc("Type_of_order")).show()

print("\n--- Broj porudzbina po tipu vozila ---")
df.groupBy("Type_of_vehicle").count().orderBy(desc("Type_of_vehicle")).show()

print("\n--- Top 10 dostavljaca sa najvecom prosecnom ocenom ---")
df.groupBy("Delivery_person_ID").avg("Delivery_person_Ratings").show(10)

print("\n --- Dodavanje kolone distance koja ce nam trebati u daljim analizama ---")
df = df.withColumn("distance",
                   sqrt(
                       pow(col("Restaurant_latitude") - col("Delivery_location_latitude"), 2) +
                       pow(col("Restaurant_longitude") - col("Delivery_location_longitude"), 2)
                   )).show(5)

df_export = df.toPandas()
output_file = os.path.join(dataset_folder, "deliverytime_analyzed.csv")
df_export.to_csv(output_file, index=False)