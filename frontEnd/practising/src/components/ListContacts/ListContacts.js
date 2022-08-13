import Contact from './../Contact/Contact'

import './ListContacts.css'

function ListContacts({ contacts, setContacts }) {
	return (
		<ol className='contacts-list'>
			{contacts.map(contact =>
				<Contact
					key={contact._id}
					contact={contact}
					contacts={contacts}
					setContacts={setContacts}
				/>
			)}
		</ol>
	)
}

export default ListContacts