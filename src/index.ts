import express, { Request, Response } from 'express'
import 'dotenv/config'
import { conexao } from './coxexao'


const app = express()

app.use(express.json())

// app.get('/', async (req:Request, res:Response) =>{   //Client
//     await client.connect()
//     const resposta = await client.query('select * from filiais')

//     await client.end()

//     return res.json(resposta)
// })

app.get('/', async (req:Request, res:Response) =>{       //Pool
    
    try {
        const resposta = await conexao.query('select * from empresas')
        return res.json(resposta.rows)
    } catch (error) {
        const erro = error as Error
        return res.status(400).json(erro.message)
    }
})

app.get('/:id', async (req:Request, res:Response) =>{       //Pool
   try {
    const {id} = req.params
    const resposta = await conexao.query('select * from empresas where id = $1',[id])
    return res.json(resposta.rows)

   } catch (error) {
    const erro = error as Error
    return res.status(400).json(erro.message)
   }
})

app.listen(process.env.PORT, ()=>{
    console.log('Servidor inicializado');
    
})