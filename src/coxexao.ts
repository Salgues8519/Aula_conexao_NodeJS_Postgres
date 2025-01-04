import {Client, Pool, ClientConfig, PoolConfig} from 'pg'

const config:PoolConfig = {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    
}

//export const client = new Client(config)

export const conexao = new Pool(config)



