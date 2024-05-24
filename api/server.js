const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
    origin: 'https://cautious-octo-eureka-ydck.vercel.app/', 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// CORS middleware
app.use(cors());
app.use(bodyParser.json());


// Endpoint to fetch portfolio data
app.get('/api/portfolio', async (req, res) => {
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

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    // Define the email options
    const mailOptions = {
        from: email,
        to: 'recipient-email@example.com',
        subject: subject,
        text: `You have a new message from ${fullName} (${phone}):\n\n${message}`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});