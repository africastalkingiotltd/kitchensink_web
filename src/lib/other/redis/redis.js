const Redis = require("ioredis");
const { promisify } = require("util");

const getRedisConnectionClient = () =>{
  let redisConnString;
  if (process.env.NODE_ENV == 'production') {
    redisConnString = process.env.REDIS_URL
  } else {
    redisConnString = "redis://127.0.0.1:6379";
  }
  return redisConnString;
};

const connOpts = {
  lazyConnect  : false,
  connectionName: "demo"
};

export const getConOpts = () => connOpts;

let redisConnectionString = getRedisConnectionClient();

const localRedisClient = new Redis(redisConnectionString, getConOpts());

export const getIORedisOptions = () => getRedisConnectionClient();

export const ioRedisClient = localRedisClient;
export const hgetallAsync = promisify(localRedisClient.hgetall).bind(localRedisClient);
export const getAsync     = promisify(localRedisClient.get).bind(localRedisClient);