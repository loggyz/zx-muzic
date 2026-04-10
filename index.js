const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS allow karega tere web player ko access karne ke liye
app.use(cors());

// Server check karne ke liye
app.get('/', (req, res) => {
    res.send('ZeroX Audio API is Live! 🔥');
});

// Asli Jadoo: YouTube Audio Extraction (Bina kisi URL jhamela ke)
app.get('/stream', async (req, res) => {
    try {
        const videoId = req.query.id;
        
        if (!videoId) {
            return res.status(400).json({ error: 'Bhai, Video ID missing hai!' });
        }

        // Direct audio stream return karna
        res.header('Content-Type', 'audio/mpeg');
        
        // ytdl-core direct Video ID support karta hai, koi link banane ki zarurat nahi
        ytdl(videoId, {
            filter: 'audioonly',
            quality: 'highestaudio'
        }).pipe(res);

    } catch (error) {
        console.error("Extraction Error:", error);
        res.status(500).json({ error: 'Server mein locha ho gaya!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server zinda ho gaya port ${PORT} pe!`);
});
