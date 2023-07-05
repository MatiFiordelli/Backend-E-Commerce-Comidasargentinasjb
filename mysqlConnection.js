import mysql from 'mysql'

export const con = mysql.createConnection({
  host: "db4free.net",
  user: "matiasdb",
  password: "fpQGqPphd4h-LG$",
  database: "matiasdb",
})

export default function mysqlConnection(){
  con()

  con.connect((err) => {
    if (err) throw err;
    console.log("Connected to de Database!");
    return true
  })
}