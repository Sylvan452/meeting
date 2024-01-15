import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const createAndJoin = () => {
    const roomId = uuidv4()
    router.push(`/${roomId}`)
  }
  return (
    <main>
      <div>
        <h1>Meeting</h1>
        <div>
          <input />
          <button>Join Meeting</button>
        </div>
        <span>-------------OR--------------</span>
        <button>Create Meeting</button>
      </div>
    </main>
  )
}
