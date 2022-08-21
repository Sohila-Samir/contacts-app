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

  const imageToShow = typeof dataToUse?.contactAvatar === 'string'
  ? `http://localhost:2022${dataToUse?.contactAvatar}`
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
    setDataToUse(prevState => ({...prevState, contactAvatar: ''}))
    setImageURL('')
  }

  return (
    <div className="contact-form-avatar-container">
      <div className="contact-form-avatar">
        {!imageURL && !dataToUse?.contactAvatar
          ? <span
              role={"img"}
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
          name="contactAvatar"
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