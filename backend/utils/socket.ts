import { Server as HttpServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';
import SavedModel from '../model/savedVacation';
import { VacationModel } from '../model/vacation';


let socketIoServer: SocketIoServer;

function initSocketIo(httpServer: HttpServer): void {
    const options = {
        cors: { origin: "*" }
    };
    socketIoServer = new SocketIoServer(httpServer, options);
    socketIoServer.sockets.on("connection", (socket: Socket) => {
        console.log("client has been connected...");
        socket.on("disconnect", () => {
            console.log("Client has been disconnected...");
        });
    });
}


function emitAddVacation(vacation: VacationModel): void {
    socketIoServer.sockets.emit("admin-add-vacation", vacation);
}

function emitUpdateVacation(vacation: VacationModel): void {
    socketIoServer.sockets.emit("admin-update-vacation", vacation);
}

function emitDeleteVacation(id: number): void {
    socketIoServer.sockets.emit("admin-delete-vacation", id);
}


function emitAddFollow(follow: SavedModel): void {
    socketIoServer.sockets.emit("user-add-follow", follow);
}

function emitRemoveFollow(follow: SavedModel): void {
    socketIoServer.sockets.emit("user-remove-follow", follow);
}

function emitFollowedVacations(vacation: VacationModel): void {
    socketIoServer.sockets.emit("user-followed-vacations", vacation);
}

export default {
    initSocketIo,
    emitAddVacation, 
    emitUpdateVacation,
    emitDeleteVacation,
    emitAddFollow,
    emitRemoveFollow,
    emitFollowedVacations
}