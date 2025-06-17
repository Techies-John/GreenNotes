# Green Notes App 💚

A full-stack notes-taking application powered by a containerized Node.js + MySQL backend, and a lightweight static frontend. Built with 💚 for simplicity, modularity, and local-first workflows.

---

## 📦 Backend (Dockerized)

The backend is fully containerized using **Docker Compose** and includes:

- **Node.js (Express)**: REST API server
- **MySQL 8.0**: Relational database
- **Adminer**: Browser-based DB management UI

### 🔧 Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/Techies-John/todolist
   cd todolist
   ```

2. Start backend services:

   ```bash
   docker compose up --build
   ```

This spins up:

- MySQL at `localhost:3306`
- Node.js API at `localhost:3000`
- Adminer at `localhost:8080`

---

### 🌐 API Endpoints

| Method | Route           | Description     |
| ------ | --------------- | --------------- |
| GET    | `/api/get-note` | Fetch all notes |
| POST   | `/api/add-note` | Add a new note  |

---

### 💾 Default MySQL Credentials

- **Database**: `app_db`
- **User**: `app_user`
- **Password**: `app_pass`

---

## 🎨 Frontend (Non-Dockerized)

The frontend is a static HTML/CSS setup you can preview using [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or any HTTP server.

### 🔧 Usage

1. Open `index.html` or `new-note.html` via Live Server
2. Submit new notes via the form
3. Data is posted directly to `http://localhost:3000/api/add-note`

> **Note:** Ensure the backend is running before submitting the form!

---

## 🛠️ Tech Stack

- Node.js + Express
- MySQL 8.0
- Docker + Docker Compose
- HTML/CSS (no frontend framework)
- Adminer for DB inspection

---

## 🚧 Future Improvements

- Switch to `fetch()` for AJAX form submission
- Containerize the frontend
- Add update/delete endpoints
- Integrate a frontend framework like Vue or React

---

## 👨‍💻 Author

Built with 💚 by [John Vincent](https://github.com/Techies-John)
