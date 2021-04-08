import { Router } from 'express'

export default (router: Router): void => {
  router.get('/healthcheck', (_, res) => {
    res.send(new Date())
  })
}
