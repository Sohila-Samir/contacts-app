import { useEffect, useRef, useState } from "react"

import Button from "../Main/Button/Button";

import './ImageInput.css';

const ImageInput = ({ onHandleDataToUseChange, dataToUse, setDataToUse }) => {
  const [imageURL, setImageURL] = useState('')
  const imageInput = useRef(null)

  useEffect(() => {
    dataToUse?.avatarURL
    ? imageInput.current.required = false
    : imageInput.current.required = true
  }, [])

  const getAvatarImgDataUrl = (file) => {
    const reader = new FileReader()
    return new Promise((resolve) => {
      reader.addEventListener('load', () => {
        resolve(reader.result)
      })
      reader.readAsDataURL(file)
    })
  }

  const imageToShow = typeof dataToUse?.avatarURL === 'string'
  ? `http://localhost:2022${dataToUse?.avatarURL}`
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
    setDataToUse(prevState => ({...prevState, avatarURL: ''}))
    setImageURL('')
  }

  return (
    <div className="contact-form-avatar-container">
      <div className="contact-form-avatar">
        {!imageURL && !dataToUse?.avatarURL
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
          name="avatarURL"
          accept=".png, .jpeg, .jpg"
          onChange={handleImgChange}
          required={true}
        />
      </div>
      <Button handleFunction={handleClearImg} text="Clear Image" type="reset"/>
    </div>
  )
}

export default ImageInput