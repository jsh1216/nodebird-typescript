import express from 'express'

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(403).send('로그인 필요')
  }
}

export const isNotLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}
