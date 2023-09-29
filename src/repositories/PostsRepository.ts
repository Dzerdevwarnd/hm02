type postType = {
	id: number
	title: string
	shortDescription: string
	content: string
	blogId: string
	blogName: string
}

export const posts: postType[] = [
	{
		id: 1,
		title: 'test title',
		shortDescription: 'test short description',
		content: 'test content',
		blogId: '1',
		blogName: 'test blog name',
	},
]

export const postsRepository = {
	findPost(id: number | null) {
		let post: postType | undefined = posts.find(
			(post): Boolean => +post.id === id
		)
		if (post) {
			return post
		} else {
			return
		}
	},
	createPost(body: {
		title: string
		shortDescription: string
		content: string
		blogId: string
	}) {
		const newPost: postType = {
			id: +new Date().toString(),
			title: body.title,
			shortDescription: body.shortDescription,
			content: body.content,
			blogId: body.blogId,
			blogName: '',
		}
		return newPost
	},
	updatePost(
		id: string,
		body: {
			title: string
			shortDescription: string
			content: string
			blogId: string
		}
	) {
		let post: postType | undefined = posts.find(
			(post): Boolean => post.id === +id
		)
		if (!post) {
			return
		} else {
			post.title = body.title
			post.shortDescription = body.shortDescription
			post.content = body.content
			post.blogName = body.blogId
			return post
		}
	},
	findIndexPost(params: { id: string }) {
		const id = params.id
		const indexPost: number | undefined = posts.findIndex(
			(post): Boolean => post.id === +id
		)
		return indexPost
	},
}
