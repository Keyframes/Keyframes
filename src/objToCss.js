import addPx from 'add-px-to-style';
import hyphenate from 'hyphenate-style-name';

export default function createMarkup(obj) {
  const keys = Object.keys(obj)
  if (!keys.length) return ''
  const i, len = keys.length
  let result = ''

  for (i = 0; i < len; i++) {
    const key = keys[i]
    const val = obj[key]
    result += hyphenate(key) + ':' + addPx(key, val) + ';'
  }

  return result
}