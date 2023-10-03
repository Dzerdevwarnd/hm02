import { Request, Response, Router } from 'express'
import { body } from 'express-validator'
import { basicAuthMiddleware } from '../middleware/authMiddleware'
import { inputValidationMiddleware } from '../middleware/inputValidationMiddleware'
import { blogs, blogsRepository } from '../repositories/blogsRepository'

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P, B> = Request<P, {}, B>

const nameValidation = body('name')
	.trim()
	.isLength({ min: 1, max: 15 })
	.withMessage('Name length should be from 1 to 15')
const descriptionValidation = body('description')
	.trim()
	.isLength({ min: 1, max: 500 })
	.withMessage('Description length should be from 1 to 500')
const urlValidation = body('websiteUrl')
	.trim()
	.isLength({ min: 1, max: 100 })
	.withMessage('URL length should be from 1 to 101')
	.isURL()
	.withMessage('Invalid URl')

export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response): void => {
	res.status(200).send(blogs)
})

blogsRouter.get(
	'/:id',
	(req: RequestWithParams<{ id: string }>, res: Response): void => {
		const foundBlog = blogsRepository.findBlog(req.params.id)
		if (!foundBlog) {
			res.sendStatus(404)
			return
		} else {
			res.status(200).send(foundBlog)
		}
	}
)

blogsRouter.post(
	'/',
	basicAuthMiddleware,
	nameValidation,
	descriptionValidation,
	urlValidation,
	inputValidationMiddleware,
	(
		req: RequestWithBody<{
			name: string
			description: string
			websiteUrl: string
		}>,
		res: Response
	): void => {
		const newBlog = blogsRepository.createBlog(req.body)
		blogs.push(newBlog)
		res.status(201).send(newBlog)
	}
)

blogsRouter.put(
	'/:id',
	basicAuthMiddleware,
	nameValidation,
	descriptionValidation,
	urlValidation,
	inputValidationMiddleware,
	(
		req: RequestWithParamsAndBody<
			{ id: string },
			{
				name: string
				description: string
				websiteUrl: string
			}
		>,
		res: Response
	): void => {
		const updateBlog = blogsRepository.updateBlog(req.params.id, req.body)
		if (!updateBlog) {
			res.sendStatus(404)
		} else {
			res.sendStatus(204)
		}
	}
)

blogsRouter.delete(
	'/:id',
	basicAuthMiddleware,
	(req: RequestWithParams<{ id: string }>, res: Response): void => {
		const indexOfBlog = blogsRepository.findIndexBlog(req.params)
		if (indexOfBlog >= 0) {
			blogs.splice(indexOfBlog, 1)
			res.sendStatus(204)
			return
		} else {
			res.sendStatus(404)
		}
	}
)
