import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'
import http from 'http';
import Socket from './websocket'


class App {
    public express: express.Application;
    public server: http.Server;

    public constructor(){
       this.express = express();
       this.server = new http.Server(this.express);
       this.middlewares();
       this.database();
       this.routes();
       this.websocket(this.server);
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors());
    }

    private database(): void {
        //Insert your URL connection for the MongoDB
        mongoose.connect('mongodb+srv://<username>:<password>@cluster0-oyhzy.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    }

    private routes (): void {
        this.express.use(routes);
    }

    private websocket (server: http.Server): void {
        Socket.setupWebSocket(server);
    }
}

export default new App().server

