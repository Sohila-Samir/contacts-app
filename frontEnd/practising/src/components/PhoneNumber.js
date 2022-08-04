import { useEffect, useState } from 'react'
import {  isPossiblePhoneNumber, parsePhoneNumber, formatPhoneNumber } from 'react-phone-number-input'

import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'

const PhoneNumber = ({ setFormInputs }) => {
  const [value, setValue] = useState('')
  const [parsedPhoneNum, setParsedPhoneNum] = useState('')

  useEffect(() => {
    if (
      value
      && isPossiblePhoneNumber(value)
      && typeof value === 'string'
      && (formatPhoneNumber(value).length === 13)
    ) {
      setParsedPhoneNum(prevState => ({...prevState, ...parsePhoneNumber(value)}))
    } else {
      setFormInputs(prevState => ({...prevState, phoneNumberInfo: {}}))
    }
  }, [value])

  useEffect(() => {
    if (Object.values(parsedPhoneNum)[0]) {
      setFormInputs(prevState => ({...prevState, phoneNumberInfo: {
        internationalNumber: parsedPhoneNum.number,
        nationalNumber: parsedPhoneNum.nationalNumber,
        countryCode: parsedPhoneNum.country,
      }}))
    }
  }, [parsedPhoneNum])

  return (
    <PhoneInput
      name="phoneNumberInfo"
      className='contact-phone-num'
      defaultCountry='EG'
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}
      smartCaret={true}
      required={true}
    />
  )
}

export default PhoneNumber