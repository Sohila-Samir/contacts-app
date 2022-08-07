const url = 'http://localhost:2022'
const axios = require('axios').default

export const getContacts = async () => {
  try {
    const res = await axios({ url: `${url}/api/contacts` })
    return await res.data
  }catch(e) {
    console.log(e);
  }
}

export const deleteContact = async (id) => {
  try {
    const res = await axios({
      url: `${url}/api/contacts/${id}/delete`,
      method: "DELETE"
    })
    return await res.data
  }catch(e) {
    console.log(e);
  }
}

export const createContact = async (data) => {
  try {
    const res = await axios({
      url: `${url}/api/contacts/new`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return await res.data
  }catch(e) {
    console.log(e);
  }
}

export const updateContact = async (data) => {
  try {
    const res = await axios({
      url: `${url}/api/contacts/${data._id}/update`,
      method: "PUT",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return await res.data
  }catch(e) {
    console.log(e);
  }
}