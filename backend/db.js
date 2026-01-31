import {Pool} from 'pg';

import {config} from  "dotenv"

config()

const {DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME} = process.env

const pool = new Pool({
  host : 'localhost',
  port : 5432,
  user : DATABASE_USERNAME,
  password : DATABASE_PASSWORD,
  database : DATABASE_NAME  
})

export default pool;