import dotenv from 'dotenv'
dotenv.config({path:'var.test.env'});

import request from 'supertest';
import app from '../src/index.js'
import dbconnect from '../src/config/db.js'
import mongoose from 'mongoose'

/**
Testing on actual stuff,, only login and listing for now , so no modifications made on actual data 
**/

beforeAll( async () =>{
	await dbconnect(process.env.DB_URL)
},10000)
afterAll( async () => {
	await mongoose.connection.close();
});


describe('Check Login and listTask' , ()=>{
	let credentials = {"username":process.env.USER_NAME,"key":process.env.KEY }
	let token = ''
	it('Should return token on login', async () => {
		const res = await request(app)
			.post('/api/login')
			.send(credentials)
			
			console.log('In login test', res.body)
			expect(res.status).toBe(200)
			expect(res.body).toHaveProperty('token')
			token = res.body.token ;
	})
	
	it('Should list active tasks for the current user ', async () => {
		const res = await request(app)
			.get('/api/list')
			.set({Authorization:token})
			
			expect(res.status).toBe(200);
	})
	
	
})