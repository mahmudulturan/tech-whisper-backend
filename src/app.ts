import express, { Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes';

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', router);


// root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Tech Whisper backend');
})


export default app;