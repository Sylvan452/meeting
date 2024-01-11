import { Server } from "socket.io"

const SocketHandler = (req, res) => {
    if (res.socket.Server.io = io) {
        console.log('socket already running...')
    } else {
        const io = new Server(res.socket.Server)
        res.socket.Server.io = io

        io.on('connection', (socket) => {
            console.log('sever is connected...')
        })
    }
    res.end();
}

export default SocketHandler;