# scripts/log_traffic.py

import requests
import json
from datetime import datetime
import os

TOKEN = os.environ["GH_TRAFFIC_TOKEN"]
OWNER = os.environ["GITHUB_OWNER"]
REPO = os.environ["GITHUB_REPO"]

headers = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def fetch(endpoint):
    url = f"https://api.github.com/repos/{OWNER}/{REPO}/traffic/{endpoint}"
    r = requests.get(url, headers=headers)
    return r.json()

data = {
    "timestamp": str(datetime.utcnow()),
    "views": fetch("views"),
    "clones": fetch("clones")
}

print("Traffic data fetched:", data)

# Save to file (append mode)
with open("traffic_log.json", "a") as f:
    f.write(json.dumps(data) + "\n")
