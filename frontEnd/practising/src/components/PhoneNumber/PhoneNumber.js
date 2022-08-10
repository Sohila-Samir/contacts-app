import { useEffect, useState } from 'react'
import {  isPossiblePhoneNumber, parsePhoneNumber } from 'react-phone-number-input'

import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'
import './PhoneNumber.css'

const PhoneNumber = ({ setDataToUse, dataToUse }) => {
  const [value, setValue] = useState('')
  const [parsedPhoneNum, setParsedPhoneNum] = useState('')

  const getCountry = dataToUse?.phoneNumberInfo?.countryCode ? dataToUse?.phoneNumberInfo?.countryCode: "EG"

  useEffect(() => {
    if (dataToUse?.phoneNumberInfo?.internationalNumber) {
      setValue(dataToUse?.phoneNumberInfo?.internationalNumber)
    }
    return () => {}
  }, [])

  useEffect(() => {
    if (
      value
      && isPossiblePhoneNumber(value)
      && typeof value === 'string'
    ) {
      console.log('valid number');
      setParsedPhoneNum(prevState => ({...prevState, ...parsePhoneNumber(value)}))
    } else {
      setDataToUse(prevState => ({...prevState, phoneNumberInfo: null}))
    }
  }, [value])

  useEffect(() => {
    if (Object.values(parsedPhoneNum)[0]) {
      setDataToUse(prevState => ({...prevState, phoneNumberInfo: {
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
      defaultCountry={getCountry}
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}
      smartCaret={true}
      required={true}
    />
  )
}

export default PhoneNumber