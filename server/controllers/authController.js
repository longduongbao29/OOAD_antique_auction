const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET
exports.register = (req, res) => {
    const { name, email, password, role } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    db.query('SELECT email FROM users WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error'+err });

        if (result.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Thêm người dùng vào database
        db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role], (err, result) => {
                if (err) return res.status(500).json({ error: 'Database error' +err });

                res.status(201).json({ message: 'User registered successfully' });
            });
    });
};
// Đăng nhập người dùng
exports.login = (req, res) => {
    const { email, password } = req.body;
    
    // Kiểm tra người dùng trong database
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error'+err });
        
        if (result.length === 0 || !result) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = result[0];

        // So sánh mật khẩu
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ error: 'Invalid password' });

        // Tạo token
        const token = jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    });
};