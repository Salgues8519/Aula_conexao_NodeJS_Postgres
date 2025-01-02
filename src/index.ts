import express, { Request, Response } from 'express'
import 'dotenv/config'

const app = express()

app.use(express.json())

app.get('/', (req:Request, res:Response):any =>{
    return res.send('okay')
})

app.listen(process.env.PORT, ()=>{
    console.log('Servidor inicializado');
    
})