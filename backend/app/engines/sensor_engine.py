import random
from datetime import datetime
from app.domain.region import Region
from app.domain.sensor import SensorReading

class SensorEngine:
    """
    Simulates fetching data from a network of ground-based IoT sensors.
    In a real system, this would query an IoT Hub/Database.
    """
    
    @staticmethod
    def get_readings(region: Region) -> SensorReading:
        # Simulate realistic variations based on the region's base characteristics
        # For Mumbai (approx lat 19), it's generally hot and humid.
        
        base_temp = 32.0 if region.lat < 25 else 25.0
        
        # Add random variance for "live" feel
        current_temp = base_temp + random.uniform(-2.0, 4.0)
        current_humidity = random.uniform(60.0, 85.0) # Coastal city simulation
        current_pm25 = random.uniform(45.0, 150.0)    # Urban pollution levels
        
        return SensorReading(
            device_count=random.randint(5, 20),
            ambient_temp_c=round(current_temp, 1),
            humidity_percent=round(current_humidity, 1),
            pm25_level=round(current_pm25, 1),
            is_calibrated=True,
            timestamp=datetime.now().isoformat()
        )
