// import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import config from "../config";
import { displayError, displaySuccess } from "../helper/toastHelper";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import AuthContext from "./../context/AuthProvider";

const Login = () => {
	const { setAuth } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	// const { setToken } = useAuth();

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			if (!email || !password) {
				alert("Enter email and password properly!");
				return;
			}

			const response = await axios.post(
				config.loginURL,
				{
					email: email,
					password: password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 201) {
				displaySuccess("Login Successful");
				// const token = response.data.token;

				const email = response?.data?.data?.email;
				const accessToken = response?.data?.data?.accessToken;
				const refreshToken = response?.data?.data?.refreshToken;
				const tokenDecoded = jwtDecode(refreshToken);
				// const roles = response?.data?.data?.roles;
				// console.log("tokenDecoded : ", tokenDecoded);
				setAuth({ email, role: tokenDecoded?.role, accessToken });

				localStorage.setItem(
					"token",
					JSON.stringify(response?.data?.data)
				);

				// return;

				navigate("/");
			} else if (response.status === 500) {
				displayError("Email or password incorrect!");
			}
		} catch (error) {
			if (error?.response?.data?.statusCode === 500) {
				displayError("Email or password incorrect!");
			}
			console.log(error);
		}
		// console.log("login res : ", response);
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "80vh",
					width: "100vw",
				}}
			>
				<form onSubmit={(event) => handleLogin(event)}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "400px",
							rowGap: "8px",
							textAlign: "center",
						}}
					>
						<Typography variant="h4">Login</Typography>
						<Typography variant="h6">
							Login to your account
						</Typography>
						<TextField
							size="small"
							variant="outlined"
							label="E-mail"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						<TextField
							type="password"
							size="small"
							variant="outlined"
							label="Password"
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
						<Button
							type="submit"
							size="small"
							variant="contained"
							color="success"
							onClick={(event) => handleLogin(event)}
						>
							Login
						</Button>
					</Box>
				</form>
			</Box>
		</>
	);
};

export default Login;
