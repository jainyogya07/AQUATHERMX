import numpy as np
from PIL import Image, ImageDraw
import os

def create_demo_tile():
    """
    Creates a synthetic 'Urban/River' satellite image for demo purposes.
    Visuals: 
    - Blue river roughly in middle
    - Gray urban areas
    - Green patches
    - Some 'plastic' like white/colorful dots
    """
    width, height = 640, 640
    img = Image.new('RGB', (width, height), color=(50, 50, 50)) # Dark urban base
    draw = ImageDraw.Draw(img)
    
    # 1. Draw River (Blue)
    draw.polygon([(0, 200), (300, 250), (640, 200), (640, 300), (300, 350), (0, 300)], fill=(30, 144, 255))
    
    # 2. Draw Green Patches (Parks)
    draw.rectangle([50, 50, 150, 150], fill=(34, 139, 34))
    draw.ellipse([400, 400, 550, 550], fill=(34, 139, 34))
    
    # 3. Draw 'Buildings' (Lighter Gray blocks)
    for x in range(0, 640, 40):
        for y in range(0, 640, 40):
            if np.random.random() > 0.7:
                draw.rectangle([x+5, y+5, x+35, y+35], fill=(100, 100, 100))

    # 4. Draw 'Plastic' waste (White/Yellow small dots near river banks)
    # Concentration areas
    # High density near river curve (300, 350)
    for _ in range(100):
        x = np.random.randint(250, 350)
        y = np.random.randint(300, 400)
        draw.ellipse([x, y, x+4, y+4], fill=(255, 255, 255)) # White bags
        
    for _ in range(50):
         x = np.random.randint(250, 350)
         y = np.random.randint(300, 400)
         draw.ellipse([x, y, x+3, y+3], fill=(255, 255, 0)) # Yellow wrappers

    output_dir = "backend/data/sentinel_cache"
    os.makedirs(output_dir, exist_ok=True)
    img.save(f"{output_dir}/demo_tile.png")
    print(f"Created demo tile at {output_dir}/demo_tile.png")

if __name__ == "__main__":
    create_demo_tile()
