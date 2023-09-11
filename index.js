import  express  from "express";
import cors from 'cors';
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import user from "./routes/user.js"
import sport from "./routes/sports.js"

 
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/sportsnew')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB... '+err.message));

app.get('/',(req,res)=>{
    res.send("welcome to Application...........")
})
 
app.use("/api/user",user)
app.use("/api/sport",sport)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`)); 