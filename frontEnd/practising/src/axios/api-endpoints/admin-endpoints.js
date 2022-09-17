export const getAdminContacts = async (instance, signal) => {
	try {
		const res = await instance.get("/admin/contacts", { signal });
		console.log(res.data.data);
		return res.data.data;
	} catch (err) {
		console.log("get admin contacts error: ", err.message);
		return err;
	}
};
