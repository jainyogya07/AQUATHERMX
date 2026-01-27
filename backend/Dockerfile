# Use an official lightweight Python image.
# 3.11-slim is a good balance of size and compatibility.
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (needed for OpenCV/Ultralytics)
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port (Render will override this env var, but good for local)
ENV PORT=8000

# Command to run the application
# We use the shell form to allow variable expansion
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]
