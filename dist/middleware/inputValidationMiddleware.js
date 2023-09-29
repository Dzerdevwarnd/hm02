"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorResponse = {
            message: errors.array()[0].msg,
            //@ts-ignore
            field: errors.array()[0].path,
        };
        res.status(400).json({ errorResponse });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
