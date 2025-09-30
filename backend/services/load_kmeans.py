import pandas as pd
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client["food_delivery"]
collection = db["kmeans"]

df = pd.read_csv("../../Spark_output/kmeans_clusters.csv")
df_subset = df[["ID", "cluster"]]

records = df_subset.to_dict('records')
collection.insert_many(records)

print(f"Ubacio {len(records)} podataka u bazu.")