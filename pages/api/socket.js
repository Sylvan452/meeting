import { Server } from "socket.io";

const SocketHandler = (req, res) => {
    console.log('called api');
    if (res.socket.server.io) {
        console.log('socket already running...');
    } else {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('sever is connected...');

            socket.on('user-connected', (roomId, userId) => {
                console.log(`A new user with ${userId} join meeting ${roomId}`);
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-connected', userId);
            });

            socket.on('disconnect', () => {
                console.log('A user disconnected');
                socket.broadcast.to(roomId).emit('user-disconnected', userId);
            });
        });
    }
    res.end();
}

export default SocketHandler;
