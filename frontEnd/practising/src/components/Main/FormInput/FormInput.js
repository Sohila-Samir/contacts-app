import { forwardRef } from "react";
import "./FormInput.css";

const FormInput = forwardRef(({ ...inputOptions }, ref) => {
	const labelName = inputOptions?.id.split("-").join(" ");
	return (
		<div className="form-input-field">
			<label htmlFor={inputOptions?.id}>{labelName}:</label>
			<input
				id={inputOptions?.id}
				className={`${inputOptions?.className} form-input`}
				type={inputOptions?.type}
				placeholder={inputOptions?.placeholder}
				name={inputOptions?.name}
				required={inputOptions?.isRequired}
				value={inputOptions?.value}
				onChange={inputOptions?.onChangeHandlerFN}
				autoComplete="true"
				ref={ref ? ref : undefined}
				pattern={inputOptions?.pattern}
				title={inputOptions?.title}
			/>
		</div>
	);
});

export default FormInput;
