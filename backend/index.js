import express from 'express';
import pool from './db.js'
import cors from  'cors';

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Expense Tracking API is running',
        endpoints: {
            'GET /api/expenses': 'Get all expenses',
            'POST /api/expenses': 'Create a new expense'
        }
    })
})

app.get('/api/expenses', async (req, res) => {

    const data = await pool.query('SELECT * FROM pengeluaran;')

    res.json({
        status : 'ok',
        data : {
            name : 'data pengeluaran',
            pengeluaran : data.rows
        }
    })
})

app.post('/api/expenses', async (req, res)=> {

    const {description, amount} = await req.body

    // validasi tambahan 

    const isi = await pool.query(
        "INSERT INTO pengeluaran (description, amount) VALUES ($1, $2) RETURNING *",
        [description, amount]
    )
    res.json(
        {
            status : 'OK',
            hasil : isi.rows
        }
    )
})

app.listen(3100, ()=> {
    console.log('jalan di port 3100')
})