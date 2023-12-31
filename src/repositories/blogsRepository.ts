export type blogType = {
	id: string
	name: string
	description: string
	websiteUrl: string
}

export const blogs: blogType[] = [
	{
		id: '1',
		name: 'test',
		description: 'testBlog',
		websiteUrl: 'Cucumber.org',
	},
]

export const blogsRepository = {
	findBlog(id: string | null) {
		let blog: blogType | undefined = blogs.find(
			(blog): Boolean => blog.id === id
		)
		if (blog) {
			return blog
		} else {
			return
		}
	},
	createBlog(body: { name: string; description: string; websiteUrl: string }) {
		const newBlog: blogType = {
			id: String(Date.now()),
			name: body.name,
			description: body.description,
			websiteUrl: body.websiteUrl,
		}
		//push
		return newBlog
	},
	updateBlog(
		id: string,
		body: { name: string; description: string; websiteUrl: string }
	) {
		let blog: blogType | undefined = blogs.find(
			(blog): Boolean => blog.id === id
		)
		if (!blog) {
			return
		} else {
			blog.name = body.name
			blog.description = body.description
			blog.websiteUrl = blog.websiteUrl
			return blog
		}
	},
	findIndexBlog(params: { id: string }) {
		const id = params.id
		const indexBlog: number | undefined = blogs.findIndex(
			(blog): Boolean => blog.id === id
		)
		return indexBlog
	},
}
