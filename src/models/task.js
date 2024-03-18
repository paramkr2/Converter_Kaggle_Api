import { Schema, model, Types } from 'mongoose';

const TaskSchema = Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    notebookId: { type: String, required: true, unique: true },
    status: { type: Boolean, required: true, default: 'queued' },
    outputFileUrl: { type: String, required: true, default: '' },
    inputFileUrl: { type: String, required: true, default: '' },
	createdAt:{type:Date,required:true,default:Date.now},
});

const TaskModel = model('Task', TaskSchema); // Removed curly braces around 'Task'

export default TaskModel;
