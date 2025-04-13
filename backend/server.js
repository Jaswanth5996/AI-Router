import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;
const PYTHON_API = 'http://localhost:5000/predict';

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
    try {
        const response = await axios.post(PYTHON_API, { input: req.body.input });
        res.json({ result: response.data.result });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Python API error' });
    }
});

app.listen(PORT, () => {
    console.log(`🌐 Express server running on http://localhost:${PORT}`);
});
