import dotenv from 'dotenv';
dotenv.config({ path: 'var.env' });

import app from './index.js'
import dbConnect from './config/db.js'
const PORT = process.env.PORT || 3000 
const HOST = process.env.HOST|| 'localhost';
const server = app.listen( PORT , HOST, ()=>{
	console.log(`Server running at host:${HOST} port ${PORT}`)
})
// listen to port 

// connect to mongodb databse 
dbConnect(process.env.DB_URL);

export default server ;