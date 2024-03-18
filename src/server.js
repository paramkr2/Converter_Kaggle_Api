import app from './index.js'
import dbConnect from './config/db.js'
const port = 8000 
const server = app.listen( port , ()=>{
	console.log(`Server running at port ${port}`)
})
// listen to port 

// connect to mongodb databse 
dbConnect();

export default server ;