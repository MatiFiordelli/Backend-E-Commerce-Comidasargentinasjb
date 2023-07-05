import express from 'express'
import cors from 'cors'
import mysqlConnection, { con } from './mysqlConnection.js'

    const app = express()
    app.use(cors())
    const port = process.env.port

    app.get('/', (req, res)=>{
        res.send('Welcome')
    })

    const routes = (term, option) => {
        if (mysqlConnection){
            let querySelector = (req) => {
                if(option === 'type') return `SELECT * FROM Products WHERE type='${term}'`
                if(option === 'search') {
                    const searchTermArray = req.params.search.split('+')
                    let conditionConcat = ''
                    const lastPosition = Object.keys(searchTermArray).length-1

                    for (const i in searchTermArray){
                        conditionConcat += `name LIKE '%${searchTermArray[i]}%' OR `
                        conditionConcat += `description LIKE '%${searchTermArray[i]}%'`
                        if (i != lastPosition) conditionConcat += " OR "
                    }
                    return `SELECT * FROM Products WHERE ${conditionConcat}`
                }
            }
            
            app.get(`/${term.toLowerCase()}`, (req, res)=>{
                const query = con.query(querySelector(req), (err, result, fields)=>{
                    if (err) throw err
                    res.json(result)
                    /* con.end() */
                })
            })
        } else {
            console.log('hubo un problema de coneccion a la base de datos')
        }
    }
    routes('Breads', 'type')
    routes('Empanadas', 'type')
    routes('Canastitas', 'type')
    routes('Pides', 'type')
    routes(':search', 'search')

    app.listen(port || 3001, ()=>console.log('server online'))