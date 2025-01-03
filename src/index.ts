import express, { Request, Response } from 'express'
import 'dotenv/config'
import { client } from './coxexao'


const app = express()

app.use(express.json())

app.get('/', async (req:Request, res:Response):Promise <any> =>{
    await client.connect()
    const resposta = await client.query('select * from empresas')

    await client.end()

    return res.json(resposta)
})

app.listen(process.env.PORT, ()=>{
    console.log('Servidor inicializado');
    
})