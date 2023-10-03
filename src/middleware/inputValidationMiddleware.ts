import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const inputValidationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		let errorsMessages = []
		for (let i = 0; i < errors.array().length; i++) {
			let errorResponse = { message: '', field: '' }
			errorResponse.message = errors.array()[i].msg
			//@ts-ignore
			errorResponse.field = errors.array()[i].path
			errorsMessages.push(errorResponse)
		}
		res.status(400).json({ errorsMessages })
	} else {
		next()
	}
}
