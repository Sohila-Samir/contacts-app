import { useEffect, useRef, useState } from "react"

import Button from "../Main/Button/Button";

import './ImageInput.css';

const ImageInput = ({ onHandleDataToUseChange, dataToUse, setDataToUse }) => {
  const [imageURL, setImageURL] = useState('')
  const imageInput = useRef(null)

  const getAvatarImgDataUrl = (file) => {
    const reader = new FileReader()
    return new Promise((resolve) => {
      reader.addEventListener('load', () => {
        resolve(reader.result)
      })
      reader.readAsDataURL(file)
    })
  }

  const imageToShow = typeof dataToUse?.imgURL === 'string'
  ? `http://localhost:2022${dataToUse?.imgURL}`
  : imageURL

  const handleImgChange = (e) => {
    if (e.target.files) {
      onHandleDataToUseChange(e)
      getAvatarImgDataUrl(e.target.files[0])
      .then(imgDataURL => setImageURL(imgDataURL))
    } else {
      setImageURL('')
    }
  }

  const handleClearImg = (e) => {
    setDataToUse(prevState => ({...prevState, imgURL: ''}))
    setImageURL('')
  }

  return (
    <div className="contact-form-avatar-container">
      <div className="contact-form-avatar">
        {!imageURL && !dataToUse?.imgURL
          ? <span
              className="contact-form-avatar-preview"
              alt="avatar"
            ></span>
          : <span
              className="contact-form-avatar-preview"
              alt="avatar"
              style={{
                backgroundImage: `url(${imageToShow})`
              }}
            ></span>
        }
        <input
          ref={imageInput}
          className="contact-form-avatar-input"
          type="file"
          name="imgURL"
          accept=".png, .jpeg, .jpg"
          onChange={handleImgChange}
        />
      </div>

      <Button
        handleFunction={handleClearImg}
        text="Clear Image"
        type="reset"
        className="clear-contact-avatar-form-btn"
      />
    </div>
  )
}

export default ImageInput