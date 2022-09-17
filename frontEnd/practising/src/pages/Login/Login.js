import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import FormInput from "./../../components/Main/FormInput/FormInput";
import PasswordLogic from "../../components/Main/PasswordLogic/PasswordLogic";
import Button from "./../../components/Main/Button/Button";
import CustomLink from "./../../components/Main/CustomLink/CustomLink";

import useAuth from "../../hooks/useAuth";
import { login } from "../../axios/api-endpoints/auth-endpoints";

import "./Login.css";

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const { handleAuthData } = useAuth();
	const [loginFormData, setLoginFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const matchPasswords = () => {
		const pwd = document.querySelector("#password");

		const confirmPwd = document.querySelector("#confirm-password");

		if (pwd.value !== confirmPwd.value) {
			confirmPwd.style.borderColor = "#ff0000";
			return false;
		}

		return true;
	};

	const handleFormData = e => {
		setLoginFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const requestLogin = async signal => {
		const res = await login(loginFormData, signal);

		const trustDeviceBtn = document.querySelector(".trustDevice");

		if (res.accessToken) {
			trustDeviceBtn.checked
				? localStorage.setItem("persist", "$persistCode@74123698")
				: localStorage.removeItem("persist");

			handleAuthData(res);

			navigate(from, { replace: true });
		}
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (matchPasswords()) {
			const controller = new AbortController();
			requestLogin(controller.signal);
		}
	};

	return (
		<>
			<section className="login-container">
				<form action="" onSubmit={handleSubmit} className="login-form">
					<h2>Login</h2>

					<FormInput
						id="email"
						className="email-input-field"
						type="email"
						name="email"
						value={loginFormData?.email}
						isRequired={true}
						onChangeHandlerFN={handleFormData}
					/>

					<PasswordLogic dataToUse={loginFormData} handleFormData={handleFormData} />

					<div className="trustDevice-container">
						<input id="trustDevice" type="checkbox" className="trustDevice" />
						<label htmlFor="trustDevice">Trust this device?</label>
					</div>

					<Button isSecondary={false} className="submit-login-form" text="Submit" type="submit" />

					<CustomLink
						URL="/register"
						text="don't have account? Sign Up"
						custom={true}
						className="register-link"
					/>
				</form>
			</section>
		</>
	);
};

export default Login;
