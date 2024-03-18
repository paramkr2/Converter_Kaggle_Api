import User from '../models/User.js'
import {checkUserCredentials,pushKernel,checkKernelStatus,downloadKernelOutput} from '../kaggle/index.js'
import jwt from 'jsonwebtoken'
import Task from '../models/task.js'
export const login = async (req,res) => {
	try{
		
		const {username,key} = req.body ;
		if( !username || !key ){
			return res.status(400).send({error:'Empty username or key'})
		}
		// send kaggle request for login 
		const valid = await checkUserCredentials(username,key);
		if( valid){
			// if user exists create jsontoken and send , other create new user 
			let user = await User.findOne({ username })
			if(!user){
				// create user 
				user = await User.create({ username })
			}
			// token 
			const payload = { userId: user._id, username, key };
			const token = jwt.sign(payload, process.env.secretKey, { expiresIn: '1h' })
			return res.status(200).send({token:token})
		}
		return res.status(401).send({msg:'check Credentials'})
	}catch(err){
		console.log(err)
		return res.status(500).send({error:'Internal Server Error'})
	}
	
}

export const  createTask = async (req,res ) => {
	try{
		const {userId,username,key} = res.locals ;
		let{ videoUrl,crfValue,name} = req.body;
		// push the task to kaggle 
		const notebookId = await pushKernel(username, key,videoUrl,crfValue,name)
		name = name==undefined?videoUrl:name;
		const task = await Task.create({userId,notebookId,name})
		res.status(201).send({taskId:task._id,notebookId});
		// code to handle task creation , import models and stuff 
	}catch(err){
		console.log(err)
		res.status(500).send({error:'Internal Sever error'})
	}
}

export const taskStatus = async (req, res) => {
    try {
        const { notebookId } = req.query;
        const { userId, username, key } = res.locals;

        // Check if task exists
        const taskdb = await Task.findOne({ notebookId });
        if (!taskdb) {
            return res.status(404).send({ error: 'Task not found' });
        }

        // Check if task status is completed or error in the database
        if (taskdb.status === 'completed' || taskdb.status === 'error') {
            return res.status(200).send({ status: taskdb.status , outputFileUrl:taskdb.outputFileUrl });
        }

        // Query Kaggle to check task status
        const taskStatus = await checkKernelStatus(username, key, notebookId);
        if (taskStatus !== 'complete') {
            return res.status(200).send({ status: taskStatus });
        }

        // If task is completed, download output files
        const files = await downloadKernelOutput(username, key, notebookId);

        // Update task status and output file URL in the database
        taskdb.status = 'completed';
        taskdb.outputFileUrl = files[0].link; // Update this with the actual file URL
        await taskdb.save();

        // Send response with task status and output files
        res.status(200).send({ status: taskdb.status, outputFileUrl:files[0].link });
    } catch (err) {
        console.error('Error fetching task status:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};



export const   deleteTask = async (req, res) => {
    try {
        // code to handle task deletion, import models and stuff
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}


export const listTask = async (req, res) => {
    try {
        // code to handle task status retrieval, import models and stuff
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

