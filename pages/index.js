import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'

import styles from '@/styles/home.module.css'
import { useState } from 'react';

export default function Home() {
  const router = useRouter()
  const [roomId, setRoomId] = useState('')

  const createAndJoin = () => {
    const roomId = uuidv4()
    router.push(`/${roomId}`)
  }

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`)
    else {
      alert('Please enter your meeting id')
    }
  }
  return (
    <div className={styles.homeContainer}>
      <h1>Meeting</h1>
      <div className={styles.enterMeeting}>
        <input placeholder='Enter Meeting ID' value={roomId} onChange={(e) => setRoomId(e.target?.value)} />
        <button onClick={joinRoom}>Join Meeting</button>
      </div>
      <span className={styles.separatorText}>-------------OR--------------</span>
      <button onClick={createAndJoin}>Create a Meeting</button>
    </div>
  )
}
