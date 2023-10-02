import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const inputValidationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		let errorMessages = []
		for (let i = 0; i < errors.array().length; i++) {
			let errorResponse = { message: '', field: '' }
			errorResponse.message = errors.array()[i].msg
			//@ts-ignore
			errorResponse.field = errors.array()[i].path
			errorMessages.push(errorResponse)
		}
		res.status(400).json({ errorMessages })
	} else {
		next()
	}
}
