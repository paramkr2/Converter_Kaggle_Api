import mongoose  from 'mongoose';
const uri = process.env.DB_URL



const dbConnect = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB connected');
    } catch (error) {
        console.error('Issue in DB Connection:', error.message);
        process.exit(1); // Exit the process if database connection fails
    }
};


export default dbConnect ;