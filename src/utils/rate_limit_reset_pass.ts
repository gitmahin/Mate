import {Ratelimit} from "@upstash/ratelimit"
import redis from "../lib/redisClient"


const ratelimit_reset_pass = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(5, "1 s")
})

export { ratelimit_reset_pass }