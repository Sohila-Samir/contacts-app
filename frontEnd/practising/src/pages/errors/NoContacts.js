import empty from './../../svgs/empty.svg'
import './../../css/NoContacts.css'

const NoContacts = () => {
  return (
    <div className="no-contacts-container">
      <h1 className="heading">Oops! Found no Contacts :(</h1>
      <div className="no-contacts-img-container">
        <img className="no-contacts-img" src={empty} alt="no contacts img"></img>
      </div>
    </div>
  )
}

export default NoContacts