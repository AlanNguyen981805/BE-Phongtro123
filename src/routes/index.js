import authRouter from './auth'
import categoryRouter from './category'
import postRouter from './post'
import areaRoute from './area'
import priceRoute from './price'
import userRoute from './user'

const initRouter = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/post', postRouter)
    app.use('/api/v1/area', areaRoute)
    app.use('/api/v1/price', priceRoute)
    app.use('/api/v1/user', userRoute)

    return app.use('/', (req, res) => {
        res.send('server on ne')
    })
}

export default initRouter