const FormatErrorAsJsonError = (field: string, message: string): Error => {
  const jsonError = { field, message }
  return new Error(JSON.stringify(jsonError))
}
export default FormatErrorAsJsonError
