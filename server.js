const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const FILE = 'data.json';

// 🔹 API เช็คชื่อ
app.post('/checkin', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.json({ message: 'กรุณากรอกชื่อ' });
  }

  let data = [];

  // อ่านไฟล์ (ถ้ามี)
  if (fs.existsSync(FILE)) {
    data = JSON.parse(fs.readFileSync(FILE));
  }

  // เพิ่มข้อมูล
  data.push({
    name: name,
    time: new Date().toLocaleString()
  });

  // เขียนกลับลงไฟล์
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json({ message: 'เช็คชื่อสำเร็จ' });
});

// 🔹 API ดูข้อมูลทั้งหมด
app.get('/data', (req, res) => {
  if (!fs.existsSync(FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// 🔥 สำคัญมาก (แก้ตรงนี้)
app.listen(3000, '0.0.0.0', () => {
  console.log('✅ Server running:');
  console.log('👉 http://localhost:3000');
});