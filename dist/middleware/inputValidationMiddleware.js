"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let errorMessages = [];
        for (let i = 0; i < errors.array().length; i++) {
            let errorResponse = { message: '', field: '' };
            errorResponse.message = errors.array()[i].msg;
            //@ts-ignore
            errorResponse.field = errors.array()[i].path;
            errorMessages.push(errorResponse);
        }
        res.status(400).json({ errorMessages });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
