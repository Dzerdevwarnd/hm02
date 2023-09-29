import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const inputValidationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const errorResponse = {
			message: errors.array()[0].msg,
			//@ts-ignore
			field: errors.array()[0].path,
		}
		res.status(400).json({ errorResponse })
	} else {
		next()
	}
}
