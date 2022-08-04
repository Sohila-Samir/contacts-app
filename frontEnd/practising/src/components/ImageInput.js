import { useState } from "react"

const ImageInput = ({ onHandleInputChange, setFormInputs }) => {
  const [imageURL, setImageURL] = useState('')

  const getAvatarImgDataUrl = (file) => {
    const reader = new FileReader()
    return new Promise((resolve) => {
      reader.addEventListener('load', () => {
        resolve(reader.result)
      })
      reader.readAsDataURL(file)
    })
  }

  const handleImgChange = (e) => {
    if (e.target.files.length) {
      onHandleInputChange(e)
      getAvatarImgDataUrl(e.target.files[0])
      .then(imgDataURL => setImageURL(imgDataURL))
    } else {
      setImageURL('')
    }
  }

  const handleClearImg = (e) => {
    setFormInputs(value => ({...value, avatarURL: ''}))
    setImageURL('')
  }

  return (
    <div className="add-avatar-img-container ">
      <div className="add-contact-avatar">
        {!imageURL
          ? <span
              className="add-contact-avatar-preview"
              alt="avatar"
            ></span>
          : <span
              className="add-contact-avatar-preview"
              alt="avatar"
              style={{
                backgroundImage: `url(${imageURL})`
              }}
            ></span>
        }
        <input
          className="add-contact-avatar-input"
          type="file"
          name="avatarURL"
          accept=".png, .jpeg, .jpg"
          onChange={handleImgChange}
          required={true}
        />
      </div>
      <button
        className="add-contact-clear-img-btn btn secondary"
        type="reset"
        onClick={handleClearImg}
      >Clear Image</button>
    </div>
  )
}

export default ImageInput