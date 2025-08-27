# Green Notes App 💚

A full-stack note-taking application built with vanilla HTML/CSS/JS on the frontend and a Node.js + MySQL backend — fully containerized using Docker Compose. Built with 💚 for simplicity, modularity, and a local-first developer workflow.



---

### 🔧 How to run

   ```bash
   docker compose up -d --build
   ```

This spins up:

- Frontend at `localhost:8081`
- Node.js API at `localhost:3000`
- MySQL at `localhost:3306`
- Adminer at `localhost:8080`

---

### 🌐 API Endpoints

| Method | Route           | Description     |
| ------ | --------------- | --------------- |
| GET    | `/api/get-notes` | Get all notes |
| GET	   | `/api/get-note/:id` |	Get a note by ID |
| POST   | `/api/add-note` | Add a new note  |
| PUT   | `/api/put-note` | Update a note  |
| DELETE   | `/api/delete-note` | Delete a note  |

---

### 💾 Default MySQL Credentials

- **Server**: `mysql`
- **Database**: `app_db`
- **User**: `app_user`
- **Password**: `app_pass`

---

## 🛠️ Tech Stack

- Node.js + Express
- MySQL 8.0.43-bookworm (Docker Image)
- Docker + Docker Compose
- HTML/CSS (no frontend framework)
- Adminer for DB inspection
- Nginx (for static frontend)

---

## 👨‍💻 Author

Made with 💚 and caffeine by [John Vincent](https://github.com/Techies-John)
