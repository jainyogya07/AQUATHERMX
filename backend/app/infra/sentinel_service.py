from pathlib import Path
from PIL import Image
from app.domain.region import Region
import logging

class SentinelService:
    def __init__(self, cache_dir: str = "backend/data/sentinel_cache"):
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.logger = logging.getLogger(__name__)

    def get_satellite_image(self, region: Region) -> Image.Image:
        """
        Retrieves a satellite image for the given region.
        For Phase 3 (Lite), this looks for a pre-fetched/cached tile 
        matching the region (roughly) or returns a default demo tile.
        """
        # MVP Lite logic:
        # Check if we have a file named 'demo_tile.tif' or 'demo_tile.png' in cache
        # In a real system, we'd hash lat/lon to finding the tile ID.
        
        demo_path = self.cache_dir / "demo_tile.png"
        
        if demo_path.exists():
            self.logger.info(f"Loading cached Sentinel tile from {demo_path}")
            return Image.open(demo_path).convert("RGB")
        
        self.logger.warning("No cached tile found. In a real system, this would trigger a download.")
        self.logger.info("Generating/Returning a placeholder for demo.")
        
        # Return a simple placeholder if nothing exists (should be handled by setup script)
        img = Image.new('RGB', (640, 640), color = (73, 109, 137))
        return img

    def get_metadata(self, region: Region) -> dict:
        """
        Returns authentic-looking metadata for the tile.
        In production, this would parse the XML/JSON associated with the Sentinel product.
        """
        return {
            "provider": "Copernicus Sentinel-2",
            "resolution": "10m",
            "cloud_cover": "12%", # Mocked for MVP
            "acquisition_date": "2025-01-14",
            "band_info": "Multispectral (B2/B3/B4/B8)"
        }

# Singleton
sentinel_service = SentinelService()
