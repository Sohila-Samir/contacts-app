import mongoose from "mongoose";

let connectionString: string;

if (process.env.NODE_ENV !== "production") {
	connectionString = process.env.TEST_DB_CONNECTION_STRING as string;
} else {
	connectionString = process.env.DB_CONNECTION_STRING as string;
}

const connect = async () => {
	const connect = await mongoose.connect(connectionString);
	console.log("database connected");
	return connect.connection.getClient();
};

export default connect;
