import { useRef } from "react";

import styles from "./Modal.css";

const Modal = ({ message, isError = false, isInfo = false, IsSuccess = false }) => {
	const modal = useRef("");
	const hideModal = e => {
		modal.current.style.display = "none";
	};

	const hideModalAutomatically = () => {
		setTimeout(() => {
			modal.current.style.display = "none";
		}, 5000);
	};

	hideModalAutomatically();

	const decidedModalState = () => {
		return isError ? "error" : isInfo ? "info" : IsSuccess ? "success" : "default";
	};

	return (
		<div
			className={`modal-container ${decidedModalState()}`}
			aria-haspopup={"dialog"}
			tabIndex={1}
			ref={modal}>
			<p className="message-text">{message}</p>
			<span className="close-icon" onClick={hideModal} aria-pressed={"true"}>
				X
			</span>
		</div>
	);
};

export default Modal;
