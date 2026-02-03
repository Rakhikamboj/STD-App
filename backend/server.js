import express from 'express';
import connectDB from './config/db.js';

import cors from 'cors';
import dotenv from 'dotenv';
import symptomsRouter from './routes/symptoms.js';
import questionsRouter from './routes/questions.js';
import doctorsRouter from './routes/doctors.js'
  
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware (optional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes
app.use('/api/symptoms', symptomsRouter);  
app.use('/api/questions', questionsRouter)
app.use('/api/doctors', doctorsRouter)

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'STI Symptom Checker API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      questions: '/api/questions/',
      communityquestions: '/api/symptoms/questions',
      analyze: '/api/symptoms/analyze',
      referenceImages: '/api/symptoms/reference-images'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});
const startServer = async () => {
  await connectDB();

// Start server


  app.listen(PORT, () => {
    console.log(`

   STI Symptom Checker API Running      
   Port: ${PORT}                           
   Environment: ${process.env.NODE_ENV || 'development'}          
   CORS Origin: ${process.env.CORS_ORIGIN || 'All origins'}   

    `);
  });
};


startServer();

export default app;


