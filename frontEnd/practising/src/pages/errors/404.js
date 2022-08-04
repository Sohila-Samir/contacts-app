import './../../css/404.css';
import notFound404 from './../../svgs/404.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className='not-found-info-container'>
        <h1 className="heading">Couldn't Find What You're Looking For</h1>
        <Link to="/" className='btn secondary'>Back to Home Page</Link>
      </div>
      <div className="not-found-img-container">
        <img src={notFound404} alt="404"></img>
      </div>
    </div>
  )
}

export default NotFound