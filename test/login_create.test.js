import dotenv from 'dotenv'
dotenv.config({path:'var.test.env'});

import request from 'supertest';
import app from '../src/index.js'
import dbconnect from '../src/config/db.js'
import mongoose from 'mongoose'
import { pushKernel, checkUserCredentials, checkKernelStatus } from '../src/kaggle/__mocks__/index.js'; 

/**
Testing on actual stuff,, only login and listing for now , so no modifications made on actual data 
**/
const clearDatabase = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]; // Fix: Use square brackets
    await collection.deleteMany({});
  }
};

beforeAll( async () =>{
	await dbconnect(process.env.DB_URL)
	await clearDatabase();
},10000)
afterAll( async () => {
	await mongoose.connection.close();
});

jest.mock('../src/kaggle/index.js');

describe('Check Login and listTask' , ()=>{
	let credentials = {"username":process.env.USER_NAME,"key":process.env.KEY }
	let token = ''
	it('Should return token on login', async () => {
		
		//checkKernelStatus.mockResolvedValueOnce('running');
		const res = await request(app)
			.post('/api/login')
			.send(credentials)
			
		console.log('In login test', res.body)
		//const kernelStatusReturnValue = checkKernelStatus.mock.results[0].value;
		//console.log('returned value', kernelStatusReturnValue)
		//expect(checkUserCredentials).toHaveBeenCalled();
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
	
	
	it('Should create a task and return notebookId', async ()=>{
		const data = {
			videoUrl:"https://www.youtube.com/watch?v=28oLMsMtn4E",
			crfValue:"32",
			name:"outputshorts",
		}
		const res = await request(app)
			.post('/api/create')
			.set({Authorization:token})
			.send(data)
		
		console.log(res.body);
		expect(res.status).toBe(201)
		expect(res.body).toHaveProperty('notebookId')
	})
	
})