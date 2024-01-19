import ReactPlayer from 'react-player';

const player = (props) => {
    const { url, muted, playing } = props
    return (
        <div>
            <ReactPlayer url={url} muted={muted} playing={playing} />
        </div>
    )
}


export default player