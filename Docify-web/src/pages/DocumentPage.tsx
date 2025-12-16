import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createYDoc } from '../crdt'
import { Editor } from '../editor/index'
import * as Y from 'yjs'
import LogoutButton from '../components/LogoutButton'

export default function DocumentPage() {
  const { docId } = useParams<{ docId: string }>()
  const [ydoc, setYDoc] = useState<Y.Doc | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!docId) return

    const doc = createYDoc()

    setYDoc(doc)

    return () => {
      doc.destroy()
    }
  }, [docId])


  if (!ydoc) return <div style={{ background: '#0f172a', color: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f172a' }}>
      <header style={{
        padding: '12px 24px',
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div
          onClick={() => navigate('/')}
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer'
          }}
        >
          Docify
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>Document: {docId}</span>
          <LogoutButton style={{ padding: '6px 12px', fontSize: '13px' }} />
        </div>
      </header>
      <main style={{ flex: 1, overflow: 'hidden' }}>
        <Editor ydoc={ydoc} />
      </main>
    </div>
  )
}

