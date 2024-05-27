const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//add hello api on '/'

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Endpoint to fetch portfolio data


app.get('/api', async (req, res) => {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/b/664f9679ad19ca34f86e10bc', {
            headers: {
                'X-ACCESS-KEY': '$2a$10$4EN2GPJn4AOiq2uNpGS35.i/DlvTFph1fgQReUBLcH2mpmm0J5ft.',
                'X-MASTER-KEY': '$2a$10$hGEua.fk2zjUH4ho80nmcuTDtW5dGXptKgrifYfbS9SwjJTfxoJ6K'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

app.post('/api/send-email', async (req, res) => {
    const { fullName, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: email,
        to: 'recipient-email@example.com',
        subject: subject,
        text: `You have a new message from ${fullName} (${phone}):\n\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})