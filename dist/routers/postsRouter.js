"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const inputValidationMiddleware_1 = require("../middleware/inputValidationMiddleware");
const PostsRepository_1 = require("../repositories/PostsRepository");
exports.postsRouter = (0, express_1.Router)({});
const titleValidation = (0, express_validator_1.body)('title')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('title length should be from 1 to 30');
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('shortDescription length should be from 1 to 100');
const contentValidation = (0, express_validator_1.body)('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content length should be from 1 to 1000');
const blogIdValidation = (0, express_validator_1.body)('BlogId')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('blogId length should be from 1 to 50');
exports.postsRouter.get('/', (req, res) => {
    res.status(200).send(PostsRepository_1.posts);
});
exports.postsRouter.get('/:id', (req, res) => {
    const foundPost = PostsRepository_1.postsRepository.findPost(req.params.id);
    if (!foundPost) {
        res.sendStatus(404);
        return;
    }
    else {
        res.status(200).send(foundPost);
    }
});
exports.postsRouter.post('/', authMiddleware_1.basicAuthMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const newPost = PostsRepository_1.postsRepository.createPost(req.body);
    PostsRepository_1.posts.push(newPost);
    res.status(201).send(newPost);
});
exports.postsRouter.put('/:id', authMiddleware_1.basicAuthMiddleware, titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const updatePost = PostsRepository_1.postsRepository.updatePost(req.params.id, req.body);
    if (!updatePost) {
        res.sendStatus(404);
    }
    else {
        res.sendStatus(204);
    }
});
exports.postsRouter.delete('/:id', authMiddleware_1.basicAuthMiddleware, (req, res) => {
    const indexOfPost = PostsRepository_1.postsRepository.findIndexPost(req.params);
    if (indexOfPost >= 0) {
        PostsRepository_1.posts.splice(indexOfPost, 1);
        res.sendStatus(204);
        return;
    }
    else {
        res.sendStatus(404);
    }
});
