import {Ratelimit} from "@upstash/ratelimit"
import redis from "../lib/redisClient"


const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(4, "1 h")
})

export default ratelimit