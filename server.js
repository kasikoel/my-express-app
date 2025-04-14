const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const { nanoid } = require('nanoid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Set up Lowdb with db.json
const adapter = new FileSync('db.json');
const db = low(adapter);
// Set defaults if not already present
db.defaults({ courses: [] }).write();

const app = express();

// Middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine and configure layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Home Page
app.get('/', (req, res) => {
    res.render('index', { title: "Smart Schedule Tool" });
});

// Courses Page: Display all courses
app.get('/courses', (req, res) => {
    const courses = db.get('courses').value();
    res.render('courses', { title: "All Courses", courses });
});

// Add Course Page: Form for adding a new course
app.get('/add-course', (req, res) => {
    res.render('addCourse', { title: "Add Course" });
});

// Handle Add Course form submission
app.post('/add-course', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.render('addCourse', { title: "Add Course", error: "All fields are required." });
    }
    const newCourse = { id: nanoid(), name, description };
    db.get('courses').push(newCourse).write();
    res.redirect('/courses');
});

// Edit Course Page: Display a form to edit a course
app.get('/edit-course/:id', (req, res) => {
    const course = db.get('courses').find({ id: req.params.id }).value();
    if (!course) return res.status(404).send("Course not found.");
    res.render('editCourse', { title: "Edit Course", course });
});

// Handle Edit Course form submission
app.post('/edit-course/:id', (req, res) => {
    const { name, description } = req.body;
    db.get('courses')
        .find({ id: req.params.id })
        .assign({ name, description })
        .write();
    res.redirect('/courses');
});

// API Endpoints for Courses (JSON)
app.get('/api/courses', (req, res) => {
    const courses = db.get('courses').value();
    res.json(courses);
});
app.post('/api/courses', (req, res) => {
    const { name, description } = req.body;
    const newCourse = { id: nanoid(), name, description };
    db.get('courses').push(newCourse).write();
    res.status(201).json(newCourse);
});
app.put('/api/courses/:id', (req, res) => {
    const { name, description } = req.body;
    db.get('courses').find({ id: req.params.id }).assign({ name, description }).write();
    res.json(db.get('courses').find({ id: req.params.id }).value());
});
app.delete('/api/courses/:id', (req, res) => {
    db.get('courses').remove({ id: req.params.id }).write();
    res.status(204).send();
});

// Feature Detail Routes

// Easy Management - displays a filterable table of courses
app.get('/features/easy-management', (req, res) => {
    const courses = db.get('courses').value();
    res.render('featureEasyManagement', { title: "Easy Management", courses });
});

// Real-Time Updates - simulates live updates by polling API
app.get('/features/real-time-updates', (req, res) => {
    res.render('featureRealTime', { title: "Real-Time Updates" });
});

// Customizable - allows user to choose a background color theme
app.get('/features/customizable', (req, res) => {
    res.render('featureCustomizable', { title: "Customizable" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
