let apiUrl = 'http://localhost:3000'
if (process.env.NODE_ENV === 'production') {
  apiUrl = ''
}
export {
  apiUrl
}
