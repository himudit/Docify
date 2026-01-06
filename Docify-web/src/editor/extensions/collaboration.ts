import {Collaboration} from '@tiptap/extension-collaboration'
import * as Y from 'yjs'

export function getCollaborationExtension(ydoc: Y.Doc) {
  return Collaboration.configure({
    document: ydoc,
  })
}
