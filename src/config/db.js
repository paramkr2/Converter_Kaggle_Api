import mongoose  from 'mongoose';

const dbConnect = async (uri) => {
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