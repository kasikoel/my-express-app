const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Set EJS as the view engine and configure layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // uses views/layout.ejs by default

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Sample API endpoint for demonstration
app.get('/api/courses', (req, res) => {
    const courses = [
        { id: 1, name: "Introduction to Node.js", description: "Learn the basics of Node.js" },
        { id: 2, name: "Advanced Express", description: "Build powerful web apps with Express" },
        { id: 3, name: "JavaScript for Web", description: "Deep dive into JavaScript" }
    ];
    res.json(courses);
});

// Render the home page
app.get('/', (req, res) => {
    res.render('index', { title: "Smart Schedule Tool" });
});

// View all courses (placeholder)
app.get('/courses', (req, res) => {
    res.render('courses', { title: "All Courses" });
});

// Add a course (placeholder)
app.get('/add-course', (req, res) => {
    res.render('addCourse', { title: "Add a Course" });
});

// Edit a course (placeholder)
app.get('/edit-course', (req, res) => {
    res.render('editCourse', { title: "Edit a Course" });
});

// Feature details: easy-management
app.get('/features/easy-management', (req, res) => {
    res.render('featureEasyManagement', { title: "Easy Management" });
});

// Feature details: real-time-updates
app.get('/features/real-time-updates', (req, res) => {
    res.render('featureRealTime', { title: "Real-Time Updates" });
});

// Feature details: customizable
app.get('/features/customizable', (req, res) => {
    res.render('featureCustomizable', { title: "Customizable" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
