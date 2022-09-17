import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";

import useLogout from "./../../hooks/useLogout";

import Logo from "../Main/Logo/Logo";
import SearchContact from "../SearchContact/SearchContact";
import CustomLink from "./../Main/CustomLink/CustomLink";

import defaultUserImage from "./assets/person.png";

import "./NavBar.css";
import Button from "../Main/Button/Button";
import useAuth from "../../hooks/useAuth";
import ROLES from "../../utils/ROLES";

const NavBar = () => {
	const navigate = useNavigate();
	const logout = useLogout();
	const { authData } = useAuth();
	const navLinksList = useRef(null);
	const userImageToShow = true ? defaultUserImage : "";

	const toggleMenuBar = e => {
		navLinksList.current.classList.toggle("toggle-menuBar");
	};

	const signOut = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<nav>
			<div className="nav-div-1">
				<div className="nav-header">
					<Logo />
					<div className="burger-icon" onClick={toggleMenuBar}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>

				<ul className="navbar-links-list" ref={navLinksList}>
					<li>
						<NavLink className={isActive => (isActive ? "navLink active" : "navLink")} to="/">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							className={isActive => (isActive ? "navLink active" : "navLink")}
							to="/contacts">
							Contacts
						</NavLink>
					</li>
					<li>
						<NavLink className={isActive => (isActive ? "navLink active" : "navLink")} to="/about">
							About
						</NavLink>
					</li>

					<li>
						{authData?.accessToken && authData?.roles.includes(ROLES.ADMIN) ? (
							<NavLink
								className={isActive => (isActive ? "navLink active" : "navLink")}
								to="/admin/dashboard">
								ADMIN
							</NavLink>
						) : (
							""
						)}
					</li>
				</ul>
			</div>

			<div className="nav-div-2">
				{authData?.accessToken ? (
					<>
						<Button
							isSecondary={false}
							custom={true}
							className="logout-btn"
							text="Logout"
							handleFunction={signOut}
						/>
						<SearchContact />
						<div className="user-profile-btn-container">
							<img className="user-profile-img" src={userImageToShow} alt="user profile"></img>
							<CustomLink
								className="user-profile-link"
								URL="/users/user"
								isSecondary={false}
								custom={true}
							/>
						</div>
					</>
				) : (
					<CustomLink
						className="login-link"
						URL="/login"
						isSecondary={false}
						custom={true}
						text="Sign In"
					/>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
