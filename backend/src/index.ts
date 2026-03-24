import {Server} from './server.js'
const port = 5000
const App = new Server(port)
App.setupMiddleware()
App.setupRoutes()
App.start();
