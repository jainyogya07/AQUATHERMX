
# Deployment Guide - AquaThermX

This project is split into two parts:
1. **Backend**: Python FastAPI (Deploy to Render)
2. **Frontend**: React Vite (Deploy to Vercel/Netlify)

---

## 1. Backend Deployment (Render.com)

1.  Push your code to GitHub.
2.  Go to [dashboard.render.com](https://dashboard.render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Settings**:
    - **Root Directory**: `backend`
    - **Runtime**: `Docker`
    - **Region**: Singapore (or closest to you)
6.  **Environment Variables**:
    - `PYTHON_VERSION`: `3.11.0`
7.  Click **Create Web Service**.
8.  **Wait for Build**: Once complete, copy the **Service URL** (e.g., `https://aquathermx-api.onrender.com`).

---

## 2. Frontend Deployment (Vercel)

1.  Go to [vercel.com](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Settings**:
    - **Framework Preset**: Vite
    - **Root Directory**: `frontend`
5.  **Environment Variables**:
    - Name: `VITE_API_URL`
    - Value: `https://aquathermx-api.onrender.com/api` (Replace with your ACTUAL Render Backend URL)
6.  Click **Deploy**.

---

## 3. Verification

1.  Open the Vercel URL (e.g., `https://aquathermx.vercel.app`).
2.  Click "Launch Console".
3.  Running an analysis should now calculate using the cloud backend.
