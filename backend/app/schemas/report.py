from pydantic import BaseModel
from typing import List, Optional
from app.domain.region import Region
from app.domain.plastic import PlasticAnalysis
from app.domain.heat import HeatIndex
from app.domain.intervention import Intervention
from app.domain.sensor import SensorReading

# Using Pydantic for API response validation if needed, 
# but for now reusing dataclasses is fine if we convert them.
# Let's make a Pydantic wrapper for the API response to be clean.

class AnalysisReport(BaseModel):
    region: Region
    plastic: PlasticAnalysis
    heat_index: HeatIndex
    interventions: List[Intervention]
    # confidence_score: float  <-- OLD
    confidence: Optional[dict] = None # New structure
    sensor_readings: Optional[SensorReading] = None # Ground truth data
