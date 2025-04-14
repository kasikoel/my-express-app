const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Initialize lowdb
const adapter = new FileSync('db.json');
const db = low(adapter);
// Set defaults if the file is empty
db.defaults({ courses: [], users: [] }).write();

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up EJS view engine and layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup express-session
app.use(session({
    secret: 'your-secret-key', // replace with a secure secret in production
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Local Strategy
passport.use(new LocalStrategy(
    function(username, password, done) {
        const user = db.get('users').find({ username }).value();
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        // For demo purposes, we use plain-text password comparison.
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser((username, done) => {
    const user = db.get('users').find({ username }).value();
    done(null, user);
});

// Middleware to ensure a user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

// Routes

// Home Page
app.get('/', (req, res) => {
    res.render('index', { title: "Smart Schedule Tool", user: req.user });
});

// User Registration Page
app.get('/register', (req, res) => {
    res.render('register', { title: "Register" });
});

// Handle Registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (db.get('users').find({ username }).value()) {
        return res.render('register', { title: "Register", error: "User already exists" });
    }
    db.get('users').push({ username, password }).write();
    res.redirect('/login');
});

// User Login Page
app.get('/login', (req, res) => {
    res.render('login', { title: "Login" });
});

// Handle Login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

// Logout
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// API Endpoints for Courses (persistent data)

// Get all courses (no authentication required for demo)
app.get('/api/courses', (req, res) => {
    const courses = db.get('courses').value();
    res.json(courses);
});

// Create a new course (protected route for demonstration; remove ensureAuthenticated if not needed)
app.post('/api/courses', ensureAuthenticated, (req, res) => {
    const { name, description } = req.body;
    const id = Date.now(); // simple unique id
    const newCourse = { id, name, description };
    db.get('courses').push(newCourse).write();
    res.status(201).json(newCourse);
});

// Update a course
app.put('/api/courses/:id', ensureAuthenticated, (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;
    db.get('courses')
        .find({ id })
        .assign({ name, description })
        .write();
    res.json(db.get('courses').find({ id }).value());
});

// Delete a course
app.delete('/api/courses/:id', ensureAuthenticated, (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.get('courses').remove({ id }).write();
    res.status(204).send();
});

// Placeholder routes for pages (using enhanced visuals)
app.get('/courses', (req, res) => {
    res.render('courses', { title: "All Courses", user: req.user });
});

app.get('/add-course', (req, res) => {
    res.render('addCourse', { title: "Add Course", user: req.user });
});

app.get('/edit-course', (req, res) => {
    res.render('editCourse', { title: "Edit Course", user: req.user });
});

app.get('/features/easy-management', (req, res) => {
    res.render('featureEasyManagement', { title: "Easy Management", user: req.user });
});

app.get('/features/real-time-updates', (req, res) => {
    res.render('featureRealTime', { title: "Real-Time Updates", user: req.user });
});

app.get('/features/customizable', (req, res) => {
    res.render('featureCustomizable', { title: "Customizable", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
