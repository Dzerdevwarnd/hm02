"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const inputValidationMiddleware_1 = require("../middleware/inputValidationMiddleware");
const blogsRepository_1 = require("../repositories/blogsRepository");
const nameValidation = (0, express_validator_1.body)('name')
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage('Name length should be from 1 to 15');
const descriptionValidation = (0, express_validator_1.body)('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description length should be from 1 to 500');
const urlValidation = (0, express_validator_1.body)('websiteUrl')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('URL length should be from 1 to 101')
    .isURL()
    .withMessage('Invalid URl');
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => {
    res.status(200).send(blogsRepository_1.blogs);
});
exports.blogsRouter.get('/:id', (req, res) => {
    const foundBlog = blogsRepository_1.blogsRepository.findBlog(req.params.id);
    if (!foundBlog) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(foundBlog);
    return;
});
exports.blogsRouter.post('/', authMiddleware_1.basicAuthMiddleware, nameValidation, descriptionValidation, urlValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const newBlog = blogsRepository_1.blogsRepository.createBlog(req.body);
    blogsRepository_1.blogs.push(newBlog);
    res.status(201).send(newBlog);
});
exports.blogsRouter.put('/:id', authMiddleware_1.basicAuthMiddleware, nameValidation, descriptionValidation, urlValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const updateBlog = blogsRepository_1.blogsRepository.updateBlog(req.params.id, req.body);
    if (!updateBlog) {
        res.sendStatus(404);
    }
    else {
        res.sendStatus(204);
    }
});
exports.blogsRouter.delete('/:id', authMiddleware_1.basicAuthMiddleware, (req, res) => {
    const indexOfBlog = blogsRepository_1.blogsRepository.findIndexBlog(req.params);
    if (indexOfBlog >= 0) {
        blogsRepository_1.blogs.splice(indexOfBlog, 1);
        res.sendStatus(204);
        return;
    }
    else {
        res.sendStatus(404);
    }
});
