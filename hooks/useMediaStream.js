import { useEffect, useRef, useState } from "react"

const useMediaStream = () => {
    const [state, setState] = useState(null)
    const isStreamSet = useRef(false)

    useEffect(() => {
        if (isStreamSet.current) return;
        (async function initStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                })
                console.log('seting my stream')
                setState(stream)
            } catch (e) {
                console.log('Error in media navigation')
            }
        })()
    }, [])
    return {
        stream: state
    }
}

export default useMediaStream