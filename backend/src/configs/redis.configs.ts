import { createClient } from "redis";

const redisClient = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT as unknown as number,
	},
});

export const connectRedis = async () => {
	redisClient.on("error", err => {
		console.log("redis error: ", err.message);
	});

	redisClient.on("connect", () => {
		console.log("redis connected!");
	});

	await redisClient.connect();
};

export default redisClient;
