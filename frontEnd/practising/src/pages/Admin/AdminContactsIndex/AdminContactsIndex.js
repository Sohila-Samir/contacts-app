import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Contact from "../../../components/Contact/Contact";
import Heading from "../../../components/Main/Heading/Heading";
import Pagination from "../../../components/Pagination/Pagination";
import NoContacts from "../../errors/NoContacts/NoContacts";
import NotFound from "../../errors/NotFound/NotFound";

import usePrivateInstance from "../../../hooks/usePrivateInstance";

import { getAdminContacts } from "../../../axios/api-endpoints/admin-endpoints";

import "./AdminContactsIndex.css";

const AdminContactsIndex = () => {
  const { pageNum } = useParams();

  const privateInstance = usePrivateInstance();

  const [adminContacts, setAdminContacts] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit] = useState(2);
  const [error, setError] = useState(1);

  const route = "/admin/dashboard/contacts/pages/";
  const currentPage = Number(pageNum) || 1;

  useEffect(() => {
    const requestContactsPage = async () => {
      const { contacts, pages: numberOfPages } = await getAdminContacts(
        privateInstance,
        currentPage,
        limit
      );

      if (currentPage > numberOfPages) {
        return setError("page not found!");
      }

      setPages(numberOfPages);
      setAdminContacts(contacts);
      setError("");
    };

    requestContactsPage();
  }, [currentPage, limit]);

  return (
    <>
      {error ? (
        <NotFound />
      ) : adminContacts?.length ? (
        <>
          <Heading text={"All App Contacts"} />
          <Pagination pages={pages} currentPage={currentPage} route={route} />

          <ol className="contacts-list">
            {adminContacts?.map((contact) => (
              <Contact contact={contact} key={contact?._id} />
            ))}
          </ol>

          <Pagination pages={pages} currentPage={currentPage} route={route} />
        </>
      ) : (
        <NoContacts />
      )}
    </>
  );
};

export default AdminContactsIndex;
