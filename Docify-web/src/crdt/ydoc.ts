import * as Y from 'yjs'

export function createYDoc() {
  const ydoc = new Y.Doc()

  ydoc.getXmlFragment('prosemirror')

  return ydoc
}
