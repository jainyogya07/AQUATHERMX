import os

class Settings:
    PROJECT_NAME: str = "AquaThermX"
    API_V1_STR: str = "/api"
    # In a real app, load these from environment variables
    MODEL_PATH: str = "yolov8n.pt"  # Default to nano model for MVP

settings = Settings()
