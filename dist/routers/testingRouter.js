"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const PostsRepository_1 = require("../repositories/PostsRepository");
const blogsRepository_1 = require("../repositories/blogsRepository");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete('/all-data', (req, res) => {
    if ((!PostsRepository_1.posts || PostsRepository_1.posts.length === 0) && (!blogsRepository_1.blogs || blogsRepository_1.blogs.length === 0)) {
        res.sendStatus(404);
        return;
    }
    else {
        PostsRepository_1.posts.splice(0, PostsRepository_1.posts.length);
        blogsRepository_1.blogs.splice(0, blogsRepository_1.blogs.length);
        res.sendStatus(204);
        return;
    }
});
