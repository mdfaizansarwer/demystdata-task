import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import path from 'path';
import url from 'url';
import startApplication from './routes/start-application.js'
import balanceSheet from './routes/balance-sheet.js'
import submitApplication from './routes/submit-application.js'
import accountingProviders from './routes/accounting-providers.js'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.static('client/build'))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/start-application', startApplication)
app.use('/balance-sheet', balanceSheet)
app.use('/submit-application', submitApplication)
app.use('/accounting-providers', accountingProviders)

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const URI = process.env.URI||'mongodb://localhost';
const PORT = process.env.PORT || 4000;

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

app.listen(PORT, async () => {
    console.log("Server is running on port", PORT);
    try {
        await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('MongoDb is Connected')
    } catch (e) {
        console.log(e)
    }
})