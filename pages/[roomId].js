import { useSocket } from '@/context/socket';
import usePeer from '@/hooks/usePeer';
import { useEffect } from 'react';
import useMediaStream from '@/hooks/useMediaStream';
import Player from '@/components/Player';

const Room = () => {
    const socket = useSocket();
    const { peer, myId } = usePeer();
    const { stream } = useMediaStream()

    return (
        <div>
            <Player url={stream} muted playing playerId={myId} />
        </div>
    )
};
export default Room;