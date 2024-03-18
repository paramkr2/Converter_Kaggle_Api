import User from '../models/User.js'
import {checkUserCredentials} from '../kaggle/index.js'
import jwt from 'jsonwebtoken'

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

export const createTask = (req,res ) => {
	try{
		// code to handle task creation , import models and stuff 
	}catch(err){
		console.log(err)
		res.status(500).send({error:'Internal Sever error'})
	}
	
}


export const deleteTask = (req, res) => {
    try {
        // code to handle task deletion, import models and stuff
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const taskStatus = (req, res) => {
    try {
        // code to handle task status retrieval, import models and stuff
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}


export const listTask = (req, res) => {
    try {
        // code to handle task status retrieval, import models and stuff
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

