const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./config/mongoose_connection');
const cookieParser = require('cookie-parser');
const playerRouter = require('./routes/PlayerRouter');
const newsRouter = require('./routes/NewsRouter');
const videoRouter = require('./routes/VideoRouter');
const scoreboardRouter = require('./routes/ScoreboardRouter');
const matchRouter = require('./routes/MatchRouter');
const userRouter = require('./routes/UserRouter');
const authRouter = require('./routes/AuthRouter');
const seasonRouter = require('./routes/SeasonRouter');
const dotenv = require('dotenv');
const cron = require('node-cron');
const { crawlScoreboardData } = require('./middleware/CrawlScoreboardData');

dotenv.config();

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(cookieParser());
app.use('/api/players', playerRouter);
app.use('/api/news', newsRouter);
app.use('/api/videos', videoRouter);
app.use('/api/scoreboard', scoreboardRouter);
app.use('/api/match', matchRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/season', seasonRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running');
});

crawlScoreboardData(2027);

cron.schedule('* 6 * * *', () => {
    crawlScoreboardData(2027);
})


