import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import {Color} from '@tiptap/extension-color'

export function getBaseExtensions() {
  return [
    StarterKit,
    TextStyle,
    Color,
  ]
}
