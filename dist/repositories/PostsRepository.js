"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = exports.posts = void 0;
exports.posts = [
    {
        id: 1,
        title: 'test title',
        shortDescription: 'test short description',
        content: 'test content',
        blogId: '1',
        blogName: 'test blog name',
    },
];
exports.postsRepository = {
    findPost(id) {
        let post = exports.posts.find((post) => +post.id === id);
        if (post) {
            return post;
        }
        else {
            return;
        }
    },
    createPost(body) {
        const newPost = {
            id: +new Date().toString(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: '',
        };
        return newPost;
    },
    updatePost(id, body) {
        let post = exports.posts.find((post) => post.id === +id);
        if (!post) {
            return;
        }
        else {
            post.title = body.title;
            post.shortDescription = body.shortDescription;
            post.content = body.content;
            post.blogName = body.blogId;
            return post;
        }
    },
    findIndexPost(params) {
        const id = params.id;
        const indexPost = exports.posts.findIndex((post) => post.id === +id);
        return indexPost;
    },
};
