import { combineReducers } from "redux"

import redisConnection from "./redisConnection"
import redisCommand from "./redisCommand"
import redisCollection from "./redisCollection"
import common from "./common"

const rootRouter = combineReducers({
  common,
  redisConnection,
  redisCommand,
  redisCollection
});

export default rootRouter
