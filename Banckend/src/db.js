import mysql from 'mysql2/promise';
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    Password:'',
    database:'tienda'
});

(async () => {
    try{
        const connection = await pool.getConnection();
        console.log('Estas conectado a la base de datos tienda');
        connection.release();
}
catch(error){
    console.error('Error al conectarse a la base de datos tienda',error.message)
}
}
)();