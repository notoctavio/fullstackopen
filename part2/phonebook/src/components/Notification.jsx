const Notification = ({ message, error }) => {
  if (!message && !error) {
    return null
  }

  const isError = Boolean(error)
  const text = error || (typeof message === 'object' ? message?.message : message)

  if (!text) {
    return null
  }

  const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    border: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle}>
      {text}
    </div>
  )
}

export default Notification