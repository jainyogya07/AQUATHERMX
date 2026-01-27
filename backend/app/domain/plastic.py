from dataclasses import dataclass, field
from typing import List, Dict, Any

@dataclass
class DetectedObject:
    label: str
    confidence: float
    box: List[float]  # [x1, y1, x2, y2]

@dataclass
class PlasticAnalysis:
    object_count: int
    density_score: float  # Normalized 0-10 based on coverage
    detections: List[DetectedObject] = field(default_factory=list)
