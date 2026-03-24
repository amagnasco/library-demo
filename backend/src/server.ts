import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import AuthCTR from './routes/Auth.js';
import ApiCTR from './routes/Api.js';
import { requireAuth } from './middleware/auth.js'

const authCTR = new AuthCTR()
const apiCTR = new ApiCTR()

/** API Server */
class Server {
    public app: Express;
    public port: number;

    constructor(port = 5000){
        this.app = express()
        this.port = port;
    }

    // setup
    public setupMiddleware(): void {
        // cross-origin
        this.app.use(
            cors({
                origin: '*',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                allowedHeaders: 'Content-Type,Authorization',
            })
        );
        // process json
        this.app.use(express.json());
    }

    // routing
    public setupRoutes(): void {

        // test route
        this.app.get('/test', async (req: Request, res: Response) => {
            console.log(`TEST URL PINGED`)
            res.status(200).json('Server is online')
        })

        // no-token-yet route
        this.app.post('/auth', authCTR.login.bind(authCTR))

        // authenticated route
        this.app.use('/api', requireAuth, apiCTR.getRouter())

        // catch-all
        this.app.all('*', function(req: Request, res: Response){
            console.error(`invalid route! ${req.method} ${req.path}`)
            return res.status(400).json({ success: false, error: "invalid route!"})
        })
    }

    // launch
    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Express server is running on port ${this.port}`);
        });
    }
}

export {Server}
