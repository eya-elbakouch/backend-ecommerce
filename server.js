const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const petRoutes = require('./routes/petRoutes');
const orderRoutes = require('./routes/orderRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const vetRoutes = require('./routes/vetRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/vets', vetRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('API Petchologie is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
