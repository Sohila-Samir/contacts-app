import { useEffect } from 'react'

import Contact from './Contact'

import './../css/ListContacts.css'

function ListContacts({ contactsToShow, onSetContacts, onSetQueriedContacts }) {
	return (
		<ol className='contacts-list'>
			{contactsToShow.map(contact =>
				<Contact
					key={contact._id}
					contact={contact}
					onSetContacts={onSetContacts}
					onSetQueriedContacts={onSetQueriedContacts}
				/>
			)}
		</ol>
	)
}

export default ListContacts