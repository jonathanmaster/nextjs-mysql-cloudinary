import mysql from 'serverless-mysql'

// es la conexion
export const conn = mysql({
  config: {
    host: 'localhost',
    user: 'root',
    password: 'jonathan',
    port: 3306,
    database: 'nextmysqlcrud',
  },
})
