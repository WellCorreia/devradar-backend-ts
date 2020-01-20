import socketio from 'socket.io';
import http from 'http';
import parseStringAsArray from './app/utils/parseStringAsArray';
import getDistanceFromLatLonInKm from './app/utils/getDistanceFromLatLoninKm';
import { connections } from 'mongoose';

class Socket {

    public connections:any = [];
    public io: socketio.Server;

    constructor(){

    }

    public setupWebSocket (server: http.Server): any {
        this.io = socketio(server);
        this.io.on('connection', socket => {
            const {latitude, longitude, techs} = socket.handshake.query;

            this.connections.push({
                id: socket.id,
                coordinates: {
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                },
                techs: parseStringAsArray(techs),
            })
        })
    }

    /**
     * findConnections
     */
    public findConnections(coordinates: any, techs: [String]) {
        return this.connections.filter((connection:any) => {
            return getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 100
                && connection.techs.some((item:any) => techs.includes(item))
        });
    }

    public sendMessage (to:any, message:any, data:any){
        to.forEach((connection:any) => {
            this.io.to(connection.id).emit(message, data);
        });
    }
}

export default new Socket;