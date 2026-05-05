# 📚 Textbook to Podcast

Convert any textbook or PDF into an engaging podcast-style conversation using AI.

🎙️ **Live Demo:** [project-bcme3.vercel.app](https://project-bcme3.vercel.app)

---

## What it does

Upload any PDF — a textbook, research paper, or document — select a page range, and the app generates a natural back-and-forth conversation between two hosts (Alex and Sam) explaining the content. Then converts it to real audio you can listen to and download.

---

## How it works

1. **Upload a PDF** and select the page range you want
2. **AI generates a conversation** between Alex (the curious learner) and Sam (the explainer)
3. **Edit the conversation** if you want to tweak anything
4. **Convert to audio** using a voice of your choice
5. **Download the podcast** as an MP3

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Flask (Python) |
| AI Conversation | Groq API (Llama 3.1 8B) |
| Text to Speech | ElevenLabs API |
| PDF Parsing | PyMuPDF |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## Running locally

### Backend
```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the backend folder:
```
GROQ_API_KEY=your_groq_api_key
ELEVEN_API_KEY=your_elevenlabs_api_key
```

```bash
python app.py
```

### Frontend
```bash
cd frontend1/podcast-frontend
npm install
npm start
```

---

## Environment Variables

| Variable | Where to get it |
|---|---|
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) — free |
| `ELEVEN_API_KEY` | [elevenlabs.io](https://elevenlabs.io) — free tier |

---

## Screenshots
<img width="867" height="723" alt="image" src="https://github.com/user-attachments/assets/3063b18b-902a-41e6-9c0e-c824e7a6414c" />
<img width="702" height="902" alt="image" src="https://github.com/user-attachments/assets/6f39d546-e204-4bd6-b5cd-25efbbc5d3e6" />
---
