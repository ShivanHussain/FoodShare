# app.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import openrouteservice
import os

load_dotenv()
ORS_API_KEY = os.getenv("ORS_API_KEY")

app = FastAPI()

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = openrouteservice.Client(key=ORS_API_KEY)

@app.get("/api/directions")
def get_directions(start_lat: float = Query(...), start_lng: float = Query(...),
                   end_lat: float = Query(...), end_lng: float = Query(...)):
    coords = [[start_lng, start_lat], [end_lng, end_lat]]
    route = client.directions(coordinates=coords, profile='driving-car', format='geojson')
    return route
