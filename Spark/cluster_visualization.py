import pandas as pd
import matplotlib.pyplot as plt

csv_path = r"D:/faks/OVSP_projekat/Spark_output/kmeans_clusters.csv"
df = pd.read_csv(csv_path)

plt.figure(figsize=(10,6))
scatter = plt.scatter(
    df["Restaurant_longitude"], df["Restaurant_latitude"],
    c=df["cluster"], cmap="tab10", alpha=0.6, label="Restoran"
)
plt.scatter(
    df["Delivery_location_longitude"], df["Delivery_location_latitude"],
    c=df["cluster"], cmap="tab10", alpha=0.3, marker="x", label="Dostava"
)

plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.title("KMeans klasteri restorana i dostava")
plt.legend()
plt.show()
