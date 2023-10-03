import { Request, Response, Router } from 'express'
import { posts } from '../repositories/PostsRepository'
import { blogs } from '../repositories/blogsRepository'

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response): void => {
	posts.splice(0, posts.length)
	blogs.splice(0, blogs.length)
	res.sendStatus(204)
	return
})
