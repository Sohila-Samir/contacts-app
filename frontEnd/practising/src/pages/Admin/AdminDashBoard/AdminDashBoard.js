import CustomLink from "../../../components/Main/CustomLink/CustomLink";

const AdminDashBoard = () => {
  return (
    <CustomLink
      className="admin-dashboard__contacts"
      URL="/admin/dashboard/contacts/pages/1"
      isSecondary={true}
      text="Contacts"
    />
  );
};

export default AdminDashBoard;
