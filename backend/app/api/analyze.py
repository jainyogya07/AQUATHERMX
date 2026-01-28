from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from PIL import Image
import io
import random
from app.pipelines.urban_heat_pipeline import pipeline
from app.domain.region import Region

router = APIRouter()

@router.post("/")
def analyze_image(
    file: UploadFile = File(None), 
    lat: float = Form(0.0), 
    lng: float = Form(0.0), 
    use_satellite: bool = Form(False),
    simulation_mode: str = Form(None),
    simulation_factor: float = Form(1.0) # 0.0 to 1.0 (1.0 = no reduction, 0.0 = full removal)
):
    """
    Analyze uploaded satellite/drone image using the UrbanHeatPipeline.
    If 'use_satellite' is True, it fetches a Sentinel tile for the lat/lng.
    If 'simulation_mode' is 'cleanup', it simulates a plastic-free scenario.
    """
    try:
        image = None
        if file:
            if not file.content_type.startswith("image/"):
                raise HTTPException(status_code=400, detail="File must be an image")
            contents = file.file.read()
            image = Image.open(io.BytesIO(contents)).convert("RGB")
        elif not use_satellite:
             raise HTTPException(status_code=400, detail="Must provide file or enable use_satellite")
        
        # Create Region context
        # For MVP, population density is still mocked/random here if not passed, 
        # but optimally it should come from a service. 
        # let's pass it into the region (mocked for now)
        region = Region(
            lat=lat, 
            lng=lng,
            population_density=random.uniform(500, 5000) 
        )
        
        # Run Pipeline
        # If image is None here, pipeline will fetch via SentinelService using Region
        report = pipeline.run(image=image, region=region, simulation_mode=simulation_mode, simulation_factor=simulation_factor)
        
        # --- Backward Compatibility Adapter ---
        # Transforming new Domain Report -> Old Frontend JSON format
        # This keeps the frontend working without changes for now.
        
        # Calculate Confidence (Enhanced)
        from app.engines.confidence_engine import ConfidenceEngine
        confidence = ConfidenceEngine.evaluate(report.plastic)
        
        # Get Sentinel Metadata
        from app.infra.sentinel_service import sentinel_service
        sentinel_meta = sentinel_service.get_metadata(report.region)

        return {
            "location": {"lat": report.region.lat, "lng": report.region.lng},
            "plastic_analysis": {
                "count": report.plastic.object_count,
                "density_score": report.plastic.density_score,
            },
            "environmental_data": {
                "surface_temp_c": 35.0, # Placeholder
                "population_density": round(report.region.population_density, 0)
            },
            # Scientific Indices
            "indices": {
                "pdi": report.heat_index.plastic_density_index,
                "sai": report.heat_index.surface_absorption_index,
                "wdi": report.heat_index.water_deficit_index
            },
            "heat_score": report.heat_index.urban_risk_index,
            "intervention_suggestion": report.interventions[0].title if report.interventions else "No immediate action required",
            
            # Trust & Credibility Fields
            # Trust & Credibility Fields
            "confidence": confidence,
            "sentinel_metadata": sentinel_meta,
            
            # Ground Truth
            "sensor_readings": report.sensor_readings.__dict__ if report.sensor_readings else None
        }
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
