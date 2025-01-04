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
        const query = `
        select f.id, f.cep, f.rua, f.cidade, f.estado, f.pais, f.empresa_id, e.nome, e.site 
        from empresas as e 
        left join filiais as f on e.id = f.empresa_id;
        `
        const resposta = await conexao.query(query)

        const filiais = resposta.rows.map(filial =>{
            return {
                id: filial.id,
                cep: filial.cep,
                rua: filial.rua,
                cidade: filial.cidade,
                estado: filial.estadp,
                pais: filial.pais, 
                empresa: {
                    id: filial.empresa_id,
                    nome: filial.nome,
                    site: filial.site
                }
            }
        })

        return res.json(filiais)
    } catch (error) {
        const erro = error as Error
        return res.status(400).json(erro.message)
    }
})

app.get('/:id', async (req:Request, res:Response) =>{       //Pool
    const {id} = req.params
    try {
    const query = `
    select f.id, f.cep, f.rua, f.cidade, f.estado, f.pais, f.empresa_id, e.nome, e.site 
    from empresas as e 
    left join filiais as f on e.id = f.empresa_id
    where e.id =$1;
    `

   
    
    const resposta = await conexao.query(query,[id])
    const {empresa_id, nome, site} = resposta.rows[0]
    const filiais = resposta.rows.map(filial =>{
        return {
            id: filial.id,
            cep: filial.cep,
            rua: filial.rua,
            cidade: filial.cidade,
            estado: filial.estadp,
            pais: filial.pais, 
            
        }
    })
    const empresa ={
        id: empresa_id,
        nome, 
        site, 
        filiais 
    }

    return res.json(empresa)

   } catch (error) {
    const erro = error as Error
    return res.status(400).json(erro.message)
   }
})

app.listen(process.env.PORT, ()=>{
    console.log('Servidor inicializado');
    
})