import { useRef } from "react";

import FormInput from "../Main/FormInput/FormInput";
import ImageInput from "../ImageInput/ImageInput";
import Button from "../Main/Button/Button";
import PhoneNumber from "../PhoneNumber/PhoneNumber";

import usePrivateInstance from "../../hooks/usePrivateInstance";

import "./ContactForm.css";

const ContactForm = ({ submitFunction, dataToUse, dataDispatchFunction }) => {
	const optionalFormFields = useRef(null);
	const expandIcon = useRef(null);
	const privateInstance = usePrivateInstance();

	const handleSubmit = e => {
		e.preventDefault();
		const controller = new AbortController();
		submitFunction(privateInstance, controller.signal, dataToUse);
	};

	const handleInputChange = e => {
		dataDispatchFunction({
			type: "CHANGE_SINGLE_INPUT",
			payload: { name: e.target.name, value: e.target.value },
		});
	};

	const expandOptionalFormFields = e => {
		optionalFormFields.current.classList.toggle("expand-optional-form-fields");
		expandIcon.current.classList.toggle("rotate-expand-icon");
	};

	return (
		<>
			<section className="form-container">
				<div className="form-header">
					<h2>Contact Form</h2>
				</div>

				<form encType="multipart/form-data" onSubmit={handleSubmit} className="contact-form">
					<div className="contact-form-primary-options">
						<h3>Primary</h3>
						<FormInput
							id="name"
							className="name-input-field"
							type="text"
							name="name"
							value={dataToUse?.name}
							onChangeHandlerFN={handleInputChange}
							isRequired={true}
						/>

						<FormInput
							id="handle"
							className="handle-input-field"
							type="text"
							name="handle"
							value={dataToUse?.handle}
							onChangeHandlerFN={handleInputChange}
							isRequired={true}
						/>

						<div className="form-input-field">
							<label htmlFor="phoneNumber">Phone Number:</label>
							<PhoneNumber handleDataFN={dataDispatchFunction} dataToUse={dataToUse} />
						</div>
					</div>

					{/* --------------------------------------------------------------------------------- */}

					<div className="contact-form-optional-options">
						<div className="heading-container">
							<h3>Optional</h3>
							<span
								className="expand-icon"
								ref={expandIcon}
								onClick={expandOptionalFormFields}></span>
						</div>
						<div className="optional-fields-container" ref={optionalFormFields}>
							<ImageInput
								className="create-contact-avatar-input"
								dataToUse={dataToUse}
								handleDataFN={dataDispatchFunction}
							/>

							<div className="category-container">
								<div className="category-option">
									<input
										type="radio"
										name="category"
										value="family"
										id="family"
										onClick={handleInputChange}
									/>
									<label htmlFor="family">family</label>
								</div>

								<div className="category-option">
									<input
										type="radio"
										name="category"
										value="friends"
										id="friends"
										onClick={handleInputChange}
									/>
									<label htmlFor="friends">friends</label>
								</div>

								<div className="category-option">
									<input
										type="radio"
										name="category"
										value="co-workers"
										id="co-workers"
										onClick={handleInputChange}
									/>
									<label htmlFor="co-workers">co-workers</label>
								</div>

								<div className="category-option">
									<input
										type="radio"
										name="category"
										value="relatives"
										id="relatives"
										onClick={handleInputChange}
									/>
									<label htmlFor="relatives">relatives</label>
								</div>

								<div className="category-option">
									<input
										type="radio"
										name="category"
										value=""
										id="none"
										onClick={handleInputChange}
									/>
									<label htmlFor="none">None</label>
								</div>
							</div>

							<FormInput
								id="email"
								className="email-input-field"
								type="email"
								name="email"
								value={dataToUse?.email}
								onChangeHandlerFN={handleInputChange}
							/>

							<FormInput
								id="address"
								className="address-input-field"
								type="text"
								name="address"
								value={dataToUse?.address}
								onChangeHandlerFN={handleInputChange}
							/>
						</div>
					</div>

					<Button
						type="submit"
						text={"Submit"}
						isSecondary={false}
						className="submit-contact-form-btn"
					/>
				</form>
			</section>
		</>
	);
};

export default ContactForm;
