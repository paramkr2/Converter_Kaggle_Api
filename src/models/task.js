import { Schema, model, Types } from 'mongoose';

const TaskSchema = Schema({
	name:{type:String,required:true},
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    notebookId: { type: String, required: true, unique: true },
    status: { type: String,default: 'queued' },
    outputFileUrl: { type: String, default: ''},
    inputFileUrl: { type: String, default: '' },
	createdAt:{type:Date,default:Date.now},
	
});

const TaskModel = model('Task', TaskSchema); // Removed curly braces around 'Task'

export default TaskModel;
