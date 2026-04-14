# 🚀 AI Interview Preparation Platform

An end-to-end AI-powered web application that helps users prepare for interviews by analyzing resumes, identifying skill gaps, and generating personalized interview questions, answers, and ATS-optimized resumes.

---

## 📌 Features

### 🔐 User Authentication
- Secure authentication using **JWT (JSON Web Tokens)**
- Token blacklisting for safe logout
- Protected routes for user data security

---

### 📄 Resume & Job Analysis
- Upload resume in **PDF format**
- Provide job description
- AI (Google Gemini) analyzes:
  - Skills
  - Experience
  - Gaps vs job requirements
- Generates:
  - Personalized feedback
  - Skill gap analysis

---

### 📑 ATS-Optimized Resume Generator
- Converts AI-generated HTML into **professional PDFs**
- Uses **Puppeteer**
- Ensures resume passes **ATS (Applicant Tracking Systems)**

---

### 🎯 Interview Preparation Tools
- Technical questions + answers
- Behavioral questions
- Match score with job description
- Personalized **learning roadmap**

---

## 🏗️ Architecture

This project follows a **4-layer architecture**:

UI (Frontend)
↓
Service Layer
↓
Controller Layer
↓
API / Backend


This ensures:
- Scalability
- Maintainability
- Clean separation of concerns

---

## 🧰 Tech Stack

### Frontend
- React.js (Vite)
- Context API (State Management)
- Custom Hooks
- SCSS for styling

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### AI Integration
- Google Gemini API

### PDF Generation
- Puppeteer

---

## 📁 Project Structure

### Backend
Backend/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── model/
│ ├── routes/
│ ├── services/
│ └── app.js
├── .env
├── Dockerfile
└── package.json


### Frontend
Frontend/
├── src/
│ ├── features/
│ │ ├── auth/
│ │ └── interview/
│ ├── style/
│ ├── App.jsx
│ └── main.jsx
└── public/


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/ai-interview-platform.git
cd ai-interview-platform

cd Backend

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
npm install

npm run dev

cd Frontend
npm install
npm run dev
