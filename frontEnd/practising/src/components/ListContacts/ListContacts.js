import Contact from './../Contact/Contact'

import './ListContacts.css'

function ListContacts({ contactsToShow, contacts, setContacts, onSetQueriedContacts }) {
	return (
		<ol className='contacts-list'>
			{contactsToShow.map(contact =>
				<Contact
					key={contact._id}
					contact={contact}
					contacts={contacts}
					setContacts={setContacts}
					onSetQueriedContacts={onSetQueriedContacts}
				/>
			)}
		</ol>
	)
}

export default ListContacts