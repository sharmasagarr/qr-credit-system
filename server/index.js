import express from 'express';
import connectDB from './db.js';
import cors from "cors";
import superAdminRoutes from './routes/superAdminRoutes.js';
import globalRoutes from './routes/globalRoutes.js';
import tlmRoutes from './routes/tlmRoutes.js';
import slmRoutes from './routes/slmRoutes.js';
import flmRoutes from './routes/flmRoutes.js';
import mrRoutes from './routes/mrRoutes.js';
import creditRoutes from './routes/creditRoutes.js';
import qrRoutes from './routes/qrRoutes.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 7100;

const allowedOrigins = [
  'https://digilateral.com/business-card',
  'https://digilateral.com',
	'*'
];
/*
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/qr-codes', express.static(path.join(__dirname, 'qr-codes')));

app.use('/', globalRoutes);
app.use('/superAdmin', superAdminRoutes)
app.use('/tlm', tlmRoutes);
app.use('/slm', slmRoutes);
app.use('/flm', flmRoutes);
app.use('/mr', mrRoutes);
app.use('/credits', creditRoutes);
app.use('/qr', qrRoutes);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log('App started successfully');
        });
    } catch (err) {
        console.log('Failed to connect to DB');
        process.exit(1);
    }
};

startServer();
