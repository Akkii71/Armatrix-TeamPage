# Armatrix TeamPage

A high-performance, interactive Team Page built for the Armatrix Software Dev Intern assignment. This project features a 3D WebGL hero section, a neural network background, and a custom-engineered liquid cursor effect.

## 🚀 Live Links
- **Frontend:** https://armatrix-team-page-omega.vercel.app/team
- **Backend API:** https://armatrix-teampage.onrender.com
- **Admin Dashboard:** https://armatrix-team-page-omega.vercel.app/admin

## 🛠 Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS v4, Framer Motion, Spline (WebGL).
- **Backend:** Python 3.11, FastAPI, Uvicorn.
- **Deployment:** Vercel (FE), Render (BE).

## 🧠 Design Decisions & Features
1. **Interactive Hero Section:** Integrated a 3D Nexbot character using Spline. I implemented a CSS-transform masking strategy to hide third-party watermarks while preserving full mouse-tracking interactivity.
2. **Multi-Layered Visuals:** - **Layer 0:** A custom HTML5 Canvas Neural Network that calculates node proximity in real-time.
   - **Layer 1:** The 3D Robot.
   - **Layer 2:** A "Liquid Cursor" particle system that reacts to user movement.
3. **Magical Expansion:** Used Framer Motion `LayoutGroup` and `layoutId` to create a seamless transition where team cards "grow" into detailed dossiers.
4. **Optimized API:** Built with FastAPI for high concurrency. Implemented cache-busting logic on the frontend to ensure personnel updates are reflected instantly.

## ⚙️ Setup Instructions

### Backend
1. Navigate to `/backend`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the server: `uvicorn main:app --reload`

### Frontend
1. Navigate to `/frontend`
2. Install dependencies: `npm install`
3. Create a `.env.local` and add `NEXT_PUBLIC_API_URL=your_backend_url`
4. Run development: `npm run dev`

## 📡 API Endpoints
- `GET /api/team` - Fetch all personnel files.
- `POST /api/team` - Add a new unit to the archive.
- `DELETE /api/team/{id}` - Decommission a unit.
