import Heading from '../../../components/Main/Heading/Heading';
import Button from '../../../components/Main/Button/Button';

import notFound404 from './404.svg'
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className='not-found-info-container'>
        <Heading text="Couldn't Find What You're Looking For" />

        <Button isLink={true} URL="/" text="Back to Home Page" />
      </div>

      <div className="not-found-img-container">
        <img src={notFound404} alt="404"></img>
      </div>
    </div>
  )
}

export default NotFound