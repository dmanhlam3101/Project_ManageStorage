import React, { useState, createContext } from 'react';

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
	const isAuthenticated = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const role = localStorage.getItem('role');

	const [authContext, setAuthContext] = useState({
		isAuthenticated,
		username,
		role,
	});
	console.log(authContext)
	const AuthContextProviderData = { authContext, setAuthContext };
	return (
		<AuthContext.Provider value={AuthContextProviderData}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;