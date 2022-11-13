import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import CustomLink from "../../components/Main/CustomLink/CustomLink";
import Heading from "../../components/Main/Heading/Heading";
import Pagination from "../../components/Pagination/Pagination";
import NoContacts from "../errors/NoContacts/NoContacts";

// import { getUserContacts } from "../../axios/api-endpoints/Contact-endpoints";

import axios from "axios";
import "./Contacts.css";

const Contacts = () => {
  const { pageNum } = useParams();

  const [limit] = useState(4);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const { authData } = useAuth();
  // const [error, setError] = useState();

  // const privateInstance = usePrivateInstance();
  // const { contacts, dispatch } = useContacts();

  const currentPage = Number(pageNum) || 1;
  const route = "/contacts/pages/";

  const getContacts = () => {
    return axios.get(
      `http://localhost:2022/api/contacts/index/user/${authData?.user}`
    );
  };

  const onSuccessFetchingContacts = (data) => {
    console.log("the after success data: ", data);
    setNumberOfPages(contacts?.data?.data?.pages);
  };

  const {
    data: contacts,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery(["GET /contacts", limit, currentPage], getContacts, {
    keepPreviousData: true,
    onSuccess: onSuccessFetchingContacts,
  });

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isFetching) {
    return <h1>Fetching...</h1>;
  }

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     const { contacts, pages } = await getUserContacts(
  //       privateInstance,
  //       currentPage,
  //       limit
  //     );

  //     if (currentPage > pages) return setError("page not found!");

  //     setNumberOfPages(pages);
  //     dispatch({ type: "SET_CONTACTS", payload: contacts });
  //   };

  //   fetchContacts();
  // }, [dispatch, privateInstance, currentPage]);

  return (
    <main>
      {!contacts?.data?.data?.contacts.length ? (
        <NoContacts />
      ) : (
        <>
          <Heading text="Your Contacts" />
          <Pagination
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            route={route}
          />

          {isLoading || isFetching ? (
            <h1>Loading...</h1>
          ) : (
            <h1>fetched successfully!</h1>
            // <ol className="contacts-list">
            //   {/* {contacts?.map((contact) => (
            //     <Contact key={contact?._id} contact={contact} />
            //   ))} */}
            // </ol>
          )}

          <Pagination
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            route={route}
          />
        </>
      )}

      <CustomLink
        className="add-contact-link"
        URL="/contacts/new"
        text="+"
        custom={true}
      />
    </main>
  );
};

export default Contacts;
