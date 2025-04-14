# Smart Schedule Tool - Enhanced & Polished Version

This project is a full-stack web application built with Node.js, Express, and EJS. It features a dynamic, vibrant frontend with 3D animations, a rotating background, and interactive buttons. The backend uses Lowdb for persistent data storage and supports full CRUD operations for course management.

## What to Expect

- **Homepage:**  
  A dynamic hero section with a rotating, 3D animated background and multiple interactive buttons.
- **Courses:**  
  A page that displays a list of courses retrieved from persistent storage.
- **Add Course:**  
  A page with a form to add a new course.
- **Edit Course:**  
  A page for editing an existing course.
- **Easy Management:**  
  A feature page with a filterable table of courses.
- **Real-Time Updates:**  
  A feature page that polls the API and updates the list of courses every 5 seconds.
- **Customizable:**  
  A feature page that allows you to choose a background color theme for the app.

## What It Cannot Do Yet

- **Advanced Authentication:**  
  User management is basic and does not include secure password hashing or full authentication.
- **Real-Time Updates:**  
  While the Real-Time Updates page polls for data, it does not use WebSockets or true real-time technologies.
- **Complete Frontend CRUD:**  
  The interface for course management is functional but basic.

## Prerequisites

- Node.js (v14 or higher)
- npm

## How to Run

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd my-express-app
