import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createYDoc } from '../crdt'
import { Editor } from '../editor/index'
import * as Y from 'yjs'

export default function DocumentPage() {
  const { docId } = useParams<{ docId: string }>()
  const [ydoc, setYDoc] = useState<Y.Doc | null>(null)

  useEffect(() => {
  if (!docId) return

  const doc = createYDoc()

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
