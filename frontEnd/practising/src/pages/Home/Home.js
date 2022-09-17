// import Header from "../../components/Header/Header";
import CustomLink from "../../components/Main/CustomLink/CustomLink";
import "./Home.css";

const Home = () => {
	return (
		<>
			{/* <Header
        query={query}
        contacts={contacts}
        onSetQueriedContacts={onSetQueriedContacts}
        onSetQuery={onSetQuery}
      /> */}
			<CustomLink
				URL="/contacts"
				isSecondary={false}
				className="contacts-link"
				text="Show Contacts"
				custom={true}
			/>
		</>
	);
};

export default Home;
