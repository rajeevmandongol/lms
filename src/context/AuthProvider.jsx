import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	// eslint-disable-next-line no-unused-vars
	const [token, setToken] = useState(localStorage.getItem("token") || null);

	useEffect(() => {
		if (token) {
			// console.log("Token Found");
			// console.log("token : ", token);

			const localToken = JSON.parse(token);

			const tokenDecoded = jwtDecode(localToken.refreshToken);
			// const roles = response?.data?.data?.roles;
			// console.log("tokenDecoded : ", tokenDecoded);
			setAuth(() => {
				return {
					email: tokenDecoded?.email,
					role: tokenDecoded?.role,
					accessToken: localToken.accessToken,
				};
			});

			// console.log("new auth", auth);
		} else {
			// console.log("No token");
		}
	}, []);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
