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
            })

            socket.on('user-toggle-audio', (userId, roomId) => {
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-toggle-audio', userId)
            })

            socket.on('user-toggle-video', (userId, roomId) => {
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-toggle-video', userId)
            })

        });
    }
    res.end();
}

export default SocketHandler;
