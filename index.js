const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS allow karta hai taaki tere web player ko access mile
app.use(cors());

// Server zinda hai ya nahi check karne ke liye
app.get('/', (req, res) => {
    res.send('ZeroX Audio API is Live! 🔥');
});

// Asli Jadoo: YouTube Audio Extraction
app.get('/stream', async (req, res) => {
    try {
        const videoId = req.query.id;
        if (!videoId) {
            return res.status(400).json({ error: 'Bhai, Video ID missing hai!' });
        }

        const url = 'https://www.youtube.com/watch?v=' + videoId;
        
        // Audio stream nikalna aur direct bhejna
        res.header('Content-Type', 'audio/mpeg');
        
        ytdl(url, {
            format: 'audioonly',
            quality: 'highestaudio'
        }).pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server mein locha ho gaya!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server zinda ho gaya port ${PORT} pe!`);
});
