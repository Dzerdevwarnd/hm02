import express from 'express'
import { blogsRouter } from './routers/blogsRouter'
import { postsRouter } from './routers/postsRouter'
import { testingRouter } from './routers/testingRouter'

export const app = express()
const port = process.env.PORT || 3004

app.use(express.json())

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
