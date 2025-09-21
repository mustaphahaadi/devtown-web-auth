// Simple Node.js password hashing example using bcrypt
const bcrypt = require('bcrypt');

// Simulated user database
const users = [];

// Register function: hashes password and stores user
async function register(username, password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users.push({ username, password: hashedPassword });
    console.log(`User ${username} registered.`);
}

// Login function: verifies password
async function login(username, password) {
    const user = users.find(u => u.username === username);
    if (!user) return false;
    const match = await bcrypt.compare(password, user.password);
    return match;
}

// Example usage
(async () => {
    await register('alice', 'mypassword');
    const success = await login('alice', 'mypassword');
    console.log('Login success:', success); // true
    const fail = await login('alice', 'wrongpassword');
    console.log('Login success:', fail); // false
})();
