import mongoose, { MongooseError } from 'mongoose';

const connectionString: string = process.env.CONNECTION_STRING as string;

const connect = async () => {
	try {
		const connect = await mongoose.connect(connectionString);
		console.log('database connected');
		return connect.connection.getClient();
	} catch (err: unknown) {
		err &&
			err instanceof (Error || MongooseError) &&
			console.log(`db error: ${err.message} | ${err.name}`);
	}
};

export default connect;
