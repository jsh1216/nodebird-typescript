import express from 'express'

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    req.flash('loginError', '로그인이 필요합니다')
    res.redirect('/')
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
