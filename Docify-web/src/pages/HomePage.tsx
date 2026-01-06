import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  const createBlankDoc = async () => {
    // backend call will go here later
    const docId = 'abc123' // mock
    navigate(`/docs/${docId}`)
  }

  return (
    <div>
      <h1>Docify</h1>
      <button onClick={createBlankDoc}>
        + Create Blank Document
      </button>
    </div>
  )
}
