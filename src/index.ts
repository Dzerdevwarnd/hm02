import { app } from './setting'

const port = process.env.PORT || 3004

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
