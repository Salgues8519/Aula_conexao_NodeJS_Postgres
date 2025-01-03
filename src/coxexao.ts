import {Client, ClientConfig} from 'pg'

const config:ClientConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'aula_conexao_nodejs_postgres'
}

export const client = new Client(config)



