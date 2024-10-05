import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());


// root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Tech Whisper backend');
})


export default app;