# Smart Schedule Tool - Enhanced & Polished Version

A full‑stack web application built with Node.js, Express, and EJS. It features a dynamic, vibrant frontend with 3D animations, a rotating background, and interactive buttons. The backend uses Lowdb for persistent data storage and supports full CRUD operations for course management.

## What to Expect

- **Homepage**: A dynamic hero section with a rotating, 3D animated background and multiple interactive buttons.
- **Courses**: A page that displays a list of courses retrieved from persistent storage.
- **Add Course**: A page with a form to add a new course.
- **Edit Course**: A page for editing an existing course.
- **Easy Management**: A feature page with a filterable table of courses.
- **Real‑Time Updates**: A feature page that polls the API and updates the list of courses every 5 seconds.
- **Customizable**: A feature page that allows you to choose a background color theme for the app.

## What It Cannot Do Yet

- **Advanced Authentication**: User management is basic and does not include secure password hashing or full authentication.
- **Real‑Time Tech**: The Real‑Time Updates page polls for data, but does not use WebSockets or true real‑time technologies.
- **Complete Frontend CRUD**: The interface for course management is functional but basic.

## Prerequisites

- **Node.js** (v14 or higher)
- **npm**
- **Docker Desktop** (or Docker Engine)
- **Docker Compose** (v2+)

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd my-express-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Development Mode
For hot‑reload with **nodemon**:
```bash
npm run dev
```

## Docker

### Build the Docker Image
```bash
docker build -t smart-schedule-app .
```

### Run with Docker
```bash
docker run --rm -p 3000:3000 smart-schedule-app
```
Visit [http://localhost:3000](http://localhost:3000).

### Shell into Container (Debug)
```bash
docker run --rm -it smart-schedule-app sh
# Inside:
ls -l /usr/src/app
exit
```

## Docker Compose

If you need to orchestrate multiple services or prefer a single command:

```bash
# Build and start in detached mode
docker-compose up --build -d

# View logs
docker-compose logs -f web

# Stop and remove containers
docker-compose down
```

## IntelliJ Integration (Optional)

1. Enable the **Docker** plugin: `File → Settings → Plugins → Docker`
2. Open the **Docker** tool window: `View → Tool Windows → Docker`
3. Create a Run Configuration:
   - `Run → Edit Configurations → + → Docker` or `Docker‑Compose`
   - Point to your `Dockerfile` or `docker-compose.yml`, set the service, and apply.
4. Launch, view logs, and stop containers directly from the IDE.

## Configuration

- **PORT**: The port the server listens on (default: `3000`).
- **THEME_COLOR**: Hex code for background theme (optional).



