const contactsApi = "/contacts";

export const getContacts = async (instance) => {
  try {
    const res = await instance.get(`${contactsApi}`);
    console.log("%crequesting contacts...", "color: yellow;");
    return res?.data?.data;
  } catch (err) {
    console.log("contacts fetch error:", err.message);
  }
};

export const getContact = async (instance, id, signal) => {
  try {
    const res = await instance.get(`${contactsApi}/${id}`, {
      signal,
    });
    return await res.data.data;
  } catch (err) {
    console.log("get contact fetch error:", err.message);
  }
};

export const deleteContact = async (instance, id, signal) => {
  try {
    const res = await instance.delete(`${contactsApi}/${id}/delete`, {
      signal,
    });
    console.log("delete request", res.data);
    return res.data.data;
  } catch (err) {
    console.log("delete contact fetch error:", err.message);
  }
};

export const createContact = async (instance, data, signal) => {
  try {
    const res = await instance.post(`${contactsApi}/new`, data, {
      signal,
    });
    console.log("new contact request", res);
    return res?.data?.data;
  } catch (err) {
    console.log("create contact fetch error:", err.message);
  }
};

export const updateContact = async (instance, data, signal) => {
  try {
    const res = await instance.put(`${contactsApi}/${data._id}/update`, data, {
      signal,
    });
    console.log("update request", res.data);
    return res.data.data;
  } catch (err) {
    console.log("update contact fetch error:", err.message);
  }
};
