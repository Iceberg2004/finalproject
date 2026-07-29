# Smart Resume Builder with AI Suggestions

A resume generator that lets users fill in their resume data through a React form,
saves/loads it from a MongoDB-backed Node/Express API, gets AI-powered improvement
suggestions from OpenAI's GPT-3.5 (free-tier compatible), and exports a print-ready
PDF straight from the browser.

## Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **AI:** OpenAI Chat Completions API (`gpt-3.5-turbo`)
- **PDF export:** Browser-native print-to-PDF with dedicated print CSS (no paid PDF service needed)

## Project structure

```
smart-resume-builder/
├── backend/
│   ├── models/Resume.js
│   ├── routes/resume.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/resumeApi.js
    │   ├── components/
    │   │   ├── ResumeForm.jsx
    │   │   ├── ResumePreview.jsx
    │   │   └── AISuggestions.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
# fill in MONGODB_URI and OPENAI_API_KEY in .env
npm install
npm run dev
```

Backend runs on `http://localhost:5000` by default.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default and proxies API calls to the backend.

## Environment variables (backend/.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-builder
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
CLIENT_ORIGIN=http://localhost:5173
```

## Features

- Multi-section resume form (contact info, summary, experience, education, skills)
- Save/load resumes to MongoDB
- "Get AI Suggestions" button that sends the current resume to GPT-3.5 and returns
  concrete, section-by-section improvement suggestions
- Live preview pane with dedicated print stylesheet
- One-click "Export PDF" using the browser's print dialog (Save as PDF)

## Notes / next steps

- Add authentication (JWT) if you want per-user resumes instead of a single shared collection
- Swap OpenAI for any other free-tier LLM API by editing `backend/routes/resume.js`
- Add resume templates/themes in `ResumePreview.jsx`
