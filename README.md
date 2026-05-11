# Email Reply Generator ✉️

An AI-powered email reply generator built with **React + Vite** (frontend) and **Spring Boot** (backend). Paste any email, pick a tone, and get a smart reply instantly — also available as a **Chrome Extension** that injects directly into Gmail.

---

## Screenshots

### Web App
Paste an email on the left, get the reply on the right.

![App Screenshot](./assets/Screenshot.png)

### Gmail Extension
The **AI Reply** button injects into Gmail's compose toolbar.

![Extension Screenshot](./assets/extension.png)

---

---

## Why I Built This

Job hunting means sending dozens of emails a day — recruiters, hiring managers, referrals, follow-ups. Writing a thoughtful, well-toned reply for each one is exhausting and time-consuming.

I found myself opening multiple browser tabs, copy-pasting emails into ChatGPT, tweaking the tone, copying the reply back — over and over. So I built this tool to cut that loop down to a single click.

**The workflow it replaces:**

```
Open email → copy content → go to AI tab → paste → prompt for tone
→ copy reply → switch back → paste into compose → repeat × 20 emails
```

**The workflow now:**

```
Open email → click "AI Reply" → done
```

The Chrome Extension version makes this even faster — it injects an **AI Reply** button directly into Gmail's compose toolbar, so you never leave your inbox.

---

## Features

- 📋 Paste any email and generate a reply in seconds
- 🎭 Choose tone: **Auto**, **Professional**, **Casual**, **Friendly**
- ⚡ Fast AI responses via Gemini API
- 📋 One-click copy to clipboard
- 🧩 Chrome Extension — injects into Gmail's compose toolbar
- 🔁 Works across multiple tabs simultaneously for bulk job applications

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Styling | CSS (custom) |
| HTTP client | Axios |
| Backend | Spring Boot (Java 17) |
| AI | Google Gemini API |
| Extension | Chrome MV3 (content script + CSS) |
| API testing | Postman |

---

## Project Structure

```
email-reply-generator/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   └── src/main/java/...
└── extension/
    ├── content.js
    ├── content.css
    ├── manifest.json
    └── icons/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- Maven

---

### Backend Setup

```bash
# Navigate to backend
cd backend

# Run with Maven
./mvnw spring-boot:run
```

API runs at `http://localhost:8080`

Add your Gemini API key in `src/main/resources/application.properties`:

```properties
gemini.api.key=your_api_key_here
```

---

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at `http://localhost:5173`

Optionally create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

### Chrome Extension Setup

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked** and select the `extension/` folder
4. Open Gmail — the **AI Reply** button will appear in the compose toolbar

---

## API Reference

### `POST /api/email/generate`

**Request:**

```json
{
  "emailContent": "Hey! Please share your Resume/CV ASAP.",
  "tone": "professional"
}
```

**Response:** Plain text email reply string.

---

### Testing with Postman

Import the request manually or use the collection below:

| Field | Value |
|---|---|
| Method | POST |
| URL | `http://localhost:8080/api/email/generate` |
| Content-Type | `application/json` |

**Sample body:**

```json
{
  "emailContent": "Hi, we'd like to schedule an interview. Are you available this week?",
  "tone": "professional"
}
```

Set up a Postman **Environment** with `base_url = http://localhost:8080` so you can switch between local and deployed backends without editing every request.

---


---

## License

MIT