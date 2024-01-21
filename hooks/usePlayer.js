import { useState } from "react";
import { cloneDeep } from 'lodash';
import { useSocket } from "@/context/socket";


const usePlayer = (myId, roomId) => {
    const socket = useSocket()
    const [players, setPlayers] = useState({})
    const playerCopy = cloneDeep(players)

    const playerHighlighted = playerCopy[myId];
    delete playerCopy[myId];

    const nonHighlightedPlayer = playerCopy;

    const toggleAudio = () => {
        console.log("I toggled my audio")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy[myId].muted
            return { ...copy }
        })
        socket.emit('user-toggle-audio', myId, roomId)
    }

    const toggleVideo = () => {
        console.log("I toggled my video")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy[myId].playing
            return { ...copy }
        })
        socket.emit('user-toggle-video', myId, roomId)
    }

    return { players, setPlayers, playerHighlighted, nonHighlightedPlayer, toggleAudio, toggleVideo };
}

export default usePlayer