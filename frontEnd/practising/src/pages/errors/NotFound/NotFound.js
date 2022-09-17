import { useNavigate } from "react-router-dom";

import Heading from "../../../components/Main/Heading/Heading";
import Button from "../../../components/Main/Button/Button";

import notFound404 from "./assets/404.svg";
import "./NotFound.css";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="not-found-container">
			<div className="not-found-info-container">
				<Heading text="Couldn't Find What You're Looking For" />

				<Button
					text="Back"
					isSecondary={false}
					className="not-found-back-home-link"
					handleFunction={e => navigate(-1)}
				/>
			</div>

			<div className="not-found-img-container">
				<img src={notFound404} alt="404"></img>
			</div>
		</div>
	);
};

export default NotFound;
