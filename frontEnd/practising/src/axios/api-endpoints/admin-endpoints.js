const contactsApi = "/contacts";

export const getAdminContacts = async (instance, page, limit) => {
  try {
    const res = await instance.get(`${contactsApi}/index/admin`, {
      params: {
        page,
        limit,
      },
    });
    console.log("%crequesting admin contacts...", "color: yellow;");
    return res?.data?.data;
  } catch (err) {
    console.log("admin contacts fetch error:", err.message);
  }
};
