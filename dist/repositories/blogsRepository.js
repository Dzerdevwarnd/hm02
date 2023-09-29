"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogs = void 0;
exports.blogs = [
    {
        id: 1,
        name: 'test',
        description: 'testBlog',
        websiteUrl: 'Cucumber.org',
    },
];
exports.blogsRepository = {
    findBlog(id) {
        let blog = exports.blogs.find((blog) => blog.id === id);
        if (blog) {
            return blog;
        }
        else {
            return;
        }
    },
    createBlog(body) {
        const newBlog = {
            id: +new Date(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
        };
        return newBlog;
    },
    updateBlog(id, body) {
        let blog = exports.blogs.find((blog) => blog.id === +id);
        if (!blog) {
            return;
        }
        else {
            blog.name = body.name;
            blog.description = body.description;
            blog.websiteUrl = blog.websiteUrl;
            return blog;
        }
    },
    findIndexBlog(params) {
        const id = +params.id;
        const indexBlog = exports.blogs.findIndex((blog) => blog.id === id);
        return indexBlog;
    },
};
