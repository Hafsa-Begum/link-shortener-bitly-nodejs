import express from 'express'
import morgan from 'morgan'

const app = express();
app.use(express.json());
app.use(morgan('dev'))



app.get('/health', (req, res)=>{
    res.status(200).json({status:'Up'})
})


app.use((_req, res)=>{
    res.status(404).json({message:'Not found'})
})
app.use((err,_req, res, _next)=>{
    console.error(err.stack)
    res.status(500).json({message:'Internal server error'})
})

const port = process.env.PORT || 4040

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})