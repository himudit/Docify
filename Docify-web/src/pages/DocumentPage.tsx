import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createYDoc } from '../crdt'
import { Editor } from '../editor'
import * as Y from 'yjs'

export default function DocumentPage() {
  const { docId } = useParams<{ docId: string }>()
  const [ydoc, setYDoc] = useState<Y.Doc | null>(null)

  useEffect(() => {
    if (!docId) return

    // 1. Create CRDT document
    const doc = createYDoc()

    // snapshot loading will go here later

    setYDoc(doc)

    return () => {
      doc.destroy()
    }
  }, [docId])

  if (!ydoc) return <div>Loading...</div>

  return (
    <div>
      <Editor ydoc={ydoc} />
    </div>
  )
}
