// Node.js JWT authentication example with password hashing
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET = 'supersecretkey';
const users = [];

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, role });
    res.json({ message: 'User registered' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    // Generate JWT
    const token = jwt.sign({ username, role: user.role }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware to verify JWT and role
function auth(role) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ error: 'No token' });
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, SECRET);
            if (role && payload.role !== role) return res.status(403).json({ error: 'Forbidden' });
            req.user = payload;
            next();
        } catch {
            res.status(401).json({ error: 'Invalid token' });
        }
    };
}

// Real-life scenario: admin and user access
app.get('/admin', auth('admin'), (req, res) => {
    res.json({ message: `Welcome admin ${req.user.username}` });
});

app.get('/user', auth('user'), (req, res) => {
    res.json({ message: `Welcome user ${req.user.username}` });
});

app.listen(3000, () => console.log('Server running on port 3000'));
