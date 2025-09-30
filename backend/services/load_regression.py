import pandas as pd
from backend.config.database import client

path = r"D:\faks\OVSP_projekat\Spark_output\linear_regression_results.csv"
df = pd.read_csv(path)
df = df[["ID", "prediction"]]

db = client['food_delivery']
collection = db['linear_regression']

data = df.to_dict('records')
collection.insert_many(data)

print(f"Ubacio {len(data)} podataka u kolekciju")