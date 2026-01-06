import { EditorContent, useEditor } from '@tiptap/react'
import { getBaseExtensions } from './extensions/base'
import { getCollaborationExtension } from './extensions/collaboration'
import * as Y from 'yjs'

type Props = {
  ydoc: Y.Doc
}

export function Editor({ ydoc }: Props) {
  const editor = useEditor({
    extensions: [
      ...getBaseExtensions(),
      getCollaborationExtension(ydoc),
    ],
  })

  if (!editor) return null

  return <EditorContent editor={editor} />
}
