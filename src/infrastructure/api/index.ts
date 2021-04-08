import express, { Router } from 'express'
import HealthCheck from './routes/HealthCheck'
import setupMiddlewares from './setupMiddlewares'

const server = express()
const router = Router()
server.use('/api', router)
setupMiddlewares(server)
HealthCheck(router)

export default server
