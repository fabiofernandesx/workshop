import { Request, Response, NextFunction } from 'express'

const cors = (_: Request, resp: Response, next: NextFunction): void => {
  resp.set('access-control-allow-origin', '*')
  resp.set('access-control-allow-headers', '*')
  resp.set('access-control-allow-methods', '*')
  next()
}
export default cors
