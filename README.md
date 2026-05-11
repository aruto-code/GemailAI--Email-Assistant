# Email Reply Generator ✉️

An AI-powered email reply generator built with **React + Vite** (frontend) and **Spring Boot** (backend). Paste any email, pick a tone, and get a smart reply instantly.
---

![App Screenshot](./assests/screenshot.png)

---

## Features

- 📋 Paste any email and generate a reply in seconds
- 🎭 Choose from tone options: **Auto**, **Professional**, **Casual**, **Friendly**
- ⚡ Fast response powered by AI
- 📋 One-click copy to clipboard

---

## Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React, Vite             |
| Styling   | CSS (custom)            |
| HTTP      | Axios                   |
| Backend   | Spring Boot (Java)      |
| AI        | Gemini API              |

---

## Getting Started

### Prerequisites

- Java 17+
- Maven

---

### Frontend Setup

```bash
# Clone the repo
git clone https://github.com/your-username/email-reply-generator.git

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at `http://localhost:5173`

---

### Backend Setup

```bash
# Navigate to backend
cd backend

# Run with Maven
./mvnw spring-boot:run
```

API runs at `http://localhost:8080`

---

## Environment Variables

Create a `.env` file in the frontend root if needed:

```env
VITE_API_BASE_URL=http://localhost:8080
```

For the backend, add your Gemini API key in `application.properties`:

```properties
gemini.api.key=your_api_key_here
```

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
└── backend/
    └── src/main/java/...
```

---

## API Endpoint

**POST** `/api/email/generate`

```json
{
  "emailContent": "Hey! Please Share your Resume/CV ASAP.",
  "tone": "Professional"
}
```

**Response**: Plain text email reply string.

---

