# 🧠 HOB Counter Chat Game

A simple interactive number game between a user and a server. Each side takes turns incrementing a counter, except when a number is divisible by 5 — then they must say **"HOB"** instead of the number.

---

## 🎮 Game Rules

- Start at 1 and take turns with the server.
- Say the correct number in sequence.
- If a number is divisible by 5, say **"HOB"** instead.
- If the wrong number is said, the game ends.

---

## 📦 Versions Implemented

### 🔹 1. Plain JavaScript (Browser-only)

- No backend or server required.
- All logic is handled with `prompt()` and `alert()` in a single HTML file.

📁 Path: `plain-js/index.html`

---

### 🔹 2. AJAX (Polling Version)

- Uses `fetch()`.
- Backend can be implemented using Node.js or Python (FastAPI).

📁 Frontend: `ajax/public/index.html`, `app.js`  
📁 Backend (Node): `ajax/server/server.js`  
📁 Backend (Python): `fastapi/server/main.py`

---

### 🔹 3. Socket.IO Version (Realtime)

- Real-time bidirectional communication using WebSockets.
- Frontend and backend communicate instantly via `socket.emit` and `socket.on`.

📁 Frontend: `socketio/public/index.html`, `app.js`  
📁 Backend: `socketio/server/server.js`

Run:

```bash
cd socketio/server
npm install
nodemon server.js
```

---

### 🔹 4. FastAPI (Python Backend)

- Backend logic written in Python using FastAPI.
- CORS enabled so frontend JS can `fetch()` from a separate HTML file.

📁 Backend: `fastapi/server/main.py`  
📁 Frontend: `fastapi/public/index.html`, `app.js`

Run:

```bash
cd fastapi/server
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```

---

## 🧪 How to Test

- Open your chosen `index.html` file in a browser.
- Use the input box to enter the correct number or `HOB`.
- Observe server responses in console or UI.
- On incorrect input, the game ends.

---
