import mongoose from "mongoose";

const connectionString: string = process.env.CONNECTION_STRING as string;

const connect = async () => {
	const connect = await mongoose.connect(connectionString);
	console.log("database connected");
	return connect.connection.getClient();
};

export default connect;
