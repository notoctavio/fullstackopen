const Contact = ({ contact, deleteContact }) => {

    return (
        <li>
        {contact.name} - {contact.number}
        <button onClick={deleteContact}>
            delete
        </button>
        </li>
    )
}

export default Contact
