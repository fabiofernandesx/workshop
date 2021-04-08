import express, { Router } from 'express'
import HealthCheck from './routes/HealthCheck'

const server = express()
const router = Router()
server.use('/api', router)
HealthCheck(router)

export default server
