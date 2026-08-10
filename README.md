# 🚀 COETA E-Cell Portal

A full-stack, enterprise-grade entrepreneurship and startup ecosystem platform for **COETA** (College of Engineering and Technology, Akola / COETA). Designed for students, founders, mentors, investors, core team members, and administrators.

---

## 🌟 Key Features & Capabilities

- **Secure OTP Email Authentication**: Instant 6-digit OTP generation, Nodemailer SMTP integration, and developer console fallback.
- **Role-Based Dashboards (RBAC)**:
  - **Visitor**: View landing page, startup showcase, mentor profiles, knowledge blogs, and resource downloads.
  - **Student Member**: Manage profile, view registered event QR codes, submit startup proposals, book 1-on-1 mentor sessions, and track XP/Levels/Badges.
  - **Core Team Member**: Manage event registries, scan QR tickets, moderate articles, and coordinate mentor schedules.
  - **Admin**: Complete platform analytics with Recharts telemetry, create events, approve/reject startups, and broadcast portal notifications.
- **Gemini AI Innovation Suite**:
  - **AI Entrepreneur Copilot**: Chatbot assistant for business models, grants, incubation, and TAM/SAM/SOM questions.
  - **Startup Idea Generator**: Tailored blueprints complete with MVP execution roadmaps based on skills, budget, and industry.
  - **Pitch Deck Builder**: Structured 10-slide investor pitch decks with instant **Export to PDF**.
- **Gamification System**: Earn XP and level up for registering for events (+50 XP), submitting startups (+100 XP), and requesting mentorship (+30 XP).
- **Glassmorphism & Micro-Animations**: Built with Framer Motion, GSAP, and Tailwind CSS.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, GSAP, Recharts, Lucide Icons, jsPDF, Axios.
- **Backend**: Node.js, Express.js, TypeScript, Mongoose / MongoDB, JWT Authentication, Nodemailer OTP Service, Express Rate Limiter, Zod.
- **AI**: Google Gemini AI (`@google/generative-ai`).
- **Cloud Storage**: Cloudinary integration for startup logos and event banners.

---

## 📂 Monorepo Structure

```
coeta-ecell/
├── backend/
│   ├── src/
│   │   ├── config/            # DB & Cloud Service configurations
│   │   ├── controllers/       # Auth, User, Event, Startup, Mentor, Blog, AI controllers
│   │   ├── middleware/        # JWT auth, RBAC role guard, Rate limiters
│   │   ├── models/            # Mongoose schemas (User, Event, Registration, Startup, etc.)
│   │   ├── routes/            # Express REST API routes
│   │   ├── services/          # OTP, Gemini AI, Cloudinary services
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/        # Navbar, Footer, ChatbotWidget, etc.
    │   ├── context/           # AuthContext
    │   ├── pages/             # Landing, Auth, Dashboards, AI Hub, Showcase, Events
    │   ├── services/          # Axios API client
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tailwind.config.js
    └── index.html
```

---

## ⚡ Quick Start Guide (Run Locally)

### 1. Install Backend Dependencies & Start Server
```bash
cd backend
npm install
npm run dev
```
*The backend API will start on **http://localhost:5000**.*

### 2. Install Frontend Dependencies & Start App
```bash
cd frontend
npm install
npm run dev
```
*The Vite React frontend will launch on **http://localhost:5173**.*

---

## 🔑 Demo Account Shortcuts

You can use the built-in quick presets on the login screen (`/auth`) or enter any email:
- **Student Member**: `student@coetaecell.org`
- **Core Team Member**: `core@coetaecell.org`
- **Portal Admin**: `admin@coetaecell.org`

> **Note for Local Testing**: When you click **Generate & Send OTP**, check your backend terminal window to view the 6-digit OTP code printed directly in the server logs!

---

## 🚀 Deployment Instructions

### Deploy Frontend to Vercel
1. Push `frontend/` directory to GitHub.
2. Import project into Vercel dashboard.
3. Set Framework Preset to **Vite**.
4. Configure Environment Variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Click **Deploy**.

### Deploy Backend to Render
1. Push `backend/` directory to GitHub.
2. Create a new **Web Service** on Render.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Configure Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, etc.).
6. Click **Deploy Web Service**.
