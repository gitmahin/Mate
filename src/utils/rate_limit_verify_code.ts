import {Ratelimit} from "@upstash/ratelimit"
import redis from "../lib/redisClient"


const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(3, "1s") // set the limit for 1 d. it will be best.
})

export default ratelimit