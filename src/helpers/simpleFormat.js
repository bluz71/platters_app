// Code snippet provided by:
//   https://makandracards.com/makandra/1395-simple_format-helper-for-javascript
//
const simpleFormat = str => {
  str = str.replace(/\r\n?/, '\n')
  str = str.trim()

  if (str.length > 0) {
    str = str.replace(/\n\n+/g, '</p><p>')
    str = str.replace(/\n/g, '<br />')
    str = `<p>${str}</p>`
  }

  return str
}

export default simpleFormat
