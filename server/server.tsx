import  path from 'path'
import express from 'express'

import { serverRenderer } from './helpers/renderer'
import store from '../src/store/index'

const PORT = 8080
const app = express()
const router = express.Router()

router.use('*', (req, res) => {
	res.send(serverRenderer(req, store))
})
router.use(express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' }))
app.use(router)

app.listen(PORT, () => {
	console.log(`SSR running on port ${PORT}`)
})
