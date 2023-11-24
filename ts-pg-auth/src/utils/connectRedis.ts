import { createClient } from "redis";

const redisUrl = "redis://localhost:6379";

const redisClient = createClient({ url: redisUrl });

const connectRedis = async () => {
 try {
  await redisClient.connect();
  redisClient.set("try", "p test dulu ga sih");
 } catch (error) {
  console.log(error);
  setTimeout(connectRedis, 5000);
 }
};

connectRedis();

export default redisClient;
