import { Request, Response, Router } from 'express'
import { body } from 'express-validator'
import { basicAuthMiddleware } from '../middleware/authMiddleware'
import { inputValidationMiddleware } from '../middleware/inputValidationMiddleware'
import { posts, postsRepository } from '../repositories/PostsRepository'
type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P, B> = Request<P, {}, B>

export const postsRouter = Router({})

const titleValidation = body('title')
	.trim()
	.isLength({ min: 1, max: 30 })
	.withMessage('title length should be from 1 to 30')
const shortDescriptionValidation = body('shortDescription')
	.trim()
	.isLength({ min: 1, max: 100 })
	.withMessage('shortDescription length should be from 1 to 100')
const contentValidation = body('content')
	.trim()
	.isLength({ min: 1, max: 1000 })
	.withMessage('Content length should be from 1 to 1000')
const blogIdValidation = body('blogId')
	.isString()
	.trim()
	.isLength({ min: 1, max: 100 })
	.withMessage('blogId length should be from 1 to 100')

postsRouter.get('/', (req: Request, res: Response): void => {
	res.status(200).send(posts)
})

postsRouter.get(
	'/:id',
	(req: RequestWithParams<{ id: string }>, res: Response): void => {
		const foundPost = postsRepository.findPost(req.params.id)
		if (!foundPost) {
			res.sendStatus(404)
			return
		} else {
			res.status(200).send(foundPost)
		}
	}
)

postsRouter.post(
	'/',
	basicAuthMiddleware,
	titleValidation,
	shortDescriptionValidation,
	contentValidation,
	blogIdValidation,
	inputValidationMiddleware,
	(
		req: RequestWithBody<{
			title: string
			shortDescription: string
			content: string
			blogId: string
		}>,
		res: Response
	): void => {
		const newPost = postsRepository.createPost(req.body)
		posts.push(newPost)
		res.status(201).send(newPost)
	}
)

postsRouter.put(
	'/:id',
	basicAuthMiddleware,
	titleValidation,
	shortDescriptionValidation,
	contentValidation,
	blogIdValidation,
	inputValidationMiddleware,
	(
		req: RequestWithParamsAndBody<
			{ id: string },
			{
				title: string
				shortDescription: string
				content: string
				blogId: string
			}
		>,
		res: Response
	): void => {
		const updatePost = postsRepository.updatePost(req.params.id, req.body)
		if (!updatePost) {
			res.sendStatus(404)
		} else {
			res.sendStatus(204)
		}
	}
)

postsRouter.delete(
	'/:id',
	basicAuthMiddleware,
	(req: RequestWithParams<{ id: string }>, res: Response): void => {
		const indexOfPost = postsRepository.findIndexPost(req.params)
		if (indexOfPost >= 0) {
			posts.splice(indexOfPost, 1)
			res.sendStatus(204)
			return
		} else {
			res.sendStatus(404)
		}
	}
)
