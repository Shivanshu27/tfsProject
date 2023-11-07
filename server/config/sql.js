import mysql from "mysql"

export const db= mysql.createConnection({
    host: "localhost",
    user:'root',
    password:"Shivanshu@10",
    database:'tfs'
})