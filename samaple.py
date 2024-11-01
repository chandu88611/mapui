import csv

file_path = "sample_weather_data.csv"

data = [
    ["timestamp", "temperature", "humidity", "windSpeed", "precipitation", "pressure", "location"],
    ["2023-10-01T08:00:00Z", 20.5, 60, 5.2, 0, 1012.5, "New York"],
    ["2023-10-01T09:00:00Z", 21.0, 62, 5.4, 0, 1012.3, "New York"],
    ["2023-10-01T10:00:00Z", 22.3, 58, 5.8, 0, 1012.1, "New York"],
    ["2023-10-01T11:00:00Z", 23.5, 55, 6.0, 0, 1011.8, "New York"],
    ["2023-10-01T12:00:00Z", 24.1, 53, 6.3, 0, 1011.5, "New York"],
    ["2023-10-02T08:00:00Z", 18.2, 70, 4.8, 0, 1013.2, "San Francisco"],
    ["2023-10-02T09:00:00Z", 18.7, 68, 5.0, 0, 1013.0, "San Francisco"],
    ["2023-10-02T10:00:00Z", 19.3, 65, 5.3, 0, 1012.8, "San Francisco"],
    ["2023-10-02T11:00:00Z", 20.0, 63, 5.5, 0, 1012.5, "San Francisco"],
    ["2023-10-02T12:00:00Z", 21.5, 60, 5.7, 0, 1012.2, "San Francisco"],
    ["2023-10-03T08:00:00Z", 25.1, 55, 7.2, 0, 1011.9, "Los Angeles"],
    ["2023-10-03T09:00:00Z", 26.0, 53, 7.4, 0, 1011.7, "Los Angeles"],
    ["2023-10-03T10:00:00Z", 27.3, 51, 7.6, 0, 1011.5, "Los Angeles"],
    ["2023-10-03T11:00:00Z", 28.2, 49, 7.8, 0, 1011.3, "Los Angeles"],
    ["2023-10-03T12:00:00Z", 29.0, 47, 8.0, 0, 1011.0, "Los Angeles"]
]

with open(file_path, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)

print(f"CSV file created: {file_path}")
