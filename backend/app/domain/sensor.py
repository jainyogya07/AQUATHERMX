from dataclasses import dataclass
from typing import Optional

@dataclass
class SensorReading:
    """
    Represents aggregated data from ground-based IoT sensors in the region.
    """
    device_count: int
    ambient_temp_c: float
    humidity_percent: float
    pm25_level: float
    is_calibrated: bool
    timestamp: str
