import { useSocket } from '@/context/socket';
import usePeer from '@/hooks/usePeer';
import { useEffect } from 'react';
import useMediaStream from '@/hooks/useMediaStream';
import usePlayer from '@/hooks/usePlayer';
import Player from '@/components/Player';


const Room = () => {
    const socket = useSocket();
    const { peer, myId } = usePeer();
    const { stream } = useMediaStream();
    const { players, setPlayers } = usePlayer();


    useEffect(() => {
        if (!socket || !peer || !stream) return;
        const handleUserConnected = (newUser) => {
            console.log(`user connected in room with userid ${newUser}`)

            const call = peer.call(newUser, stream)

            console.log('Before call.on stream event');


            call.on('stream', (incomingStream) => {
                console.log(`incoming stream from ${newUser}`)
                setPlayers((prev) => ({
                    ...prev,
                    [newUser]: {
                        url: incomingStream,
                        muted: false,
                        playing: true
                    }
                }))
            })
            console.log('After call.on stream event');

        }
        socket.on('user-connected', handleUserConnected);

        return () => {
            socket.off('user-connected', handleUserConnected)

        }
    }, [peer, setPlayers, socket, stream])

    useEffect(() => {
        if (!peer || !stream) return
        peer.on('call', (call) => {
            const { peer: callerId } = call;
            call.answer(stream)

            call.on('stream', (incomingStream) => {
                console.log(`incoming stream from ${callerId}`)
                setPlayers((prev) => ({
                    ...prev,
                    [callerId]: {
                        url: incomingStream,
                        muted: false,
                        playing: true
                    }
                }))
            })
        })
    }, [peer, setPlayers, stream])

    useEffect(() => {
        if (!stream || !myId) return;
        console.log(`setting my stream ${myId}`)
        setPlayers((prev) => ({
            ...prev,
            [myId]: {
                url: stream,
                muted: false,
                playing: true
            }
        }))
    }, [myId, setPlayers, stream])

    return (
        <div>
            {Object.keys(players).map((playerId) => {
                const { url, muted, playing } = players[playerId]
                return <Player key={playerId} url={url} muted={muted} playing={playing} />

            })}
        </div>
    )
};
export default Room;