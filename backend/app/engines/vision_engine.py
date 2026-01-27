from PIL import Image
from ultralytics import YOLO
from app.core.config import settings
from app.domain.plastic import PlasticAnalysis, DetectedObject

class VisionEngine:
    def __init__(self):
        self.model = YOLO(settings.MODEL_PATH)
    
    def analyze(self, image: Image.Image) -> PlasticAnalysis:
        results = self.model(image)
        
        detections = []
        count = 0
        
        for r in results:
            for box in r.boxes:
                detections.append(DetectedObject(
                    label=self.model.names[int(box.cls[0])],
                    confidence=float(box.conf[0]),
                    box=box.xyxy[0].tolist()
                ))
                count += 1
        
        # Heuristic density
        w, h = image.size
        density = min((count * 10000) / (w * h), 10.0)
        
        return PlasticAnalysis(
            object_count=count,
            density_score=round(density, 2),
            detections=detections
        )
