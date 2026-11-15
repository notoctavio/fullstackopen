const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        fontSize: 16,
        border: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null){
        return null
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification