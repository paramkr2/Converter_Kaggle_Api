import app from './index.js'
import dbConnect from './config/db.js'
const PORT = process.env.PORT || 3000 
const HOST = process.env.HOST|| 'localhost';
const server = app.listen( PORT , HOST, ()=>{
	console.log(`Server running at port ${PORT}`)
})
// listen to port 

// connect to mongodb databse 
dbConnect();

export default server ;