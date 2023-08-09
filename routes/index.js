import postRouter from './PostRouter.js'


const routes = (app) => {
   
    app.use('/posts', postRouter)

}

export default routes;