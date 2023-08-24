import { message } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../src/contexts/AuthContext';

const AdminGuard = ({ children }) => {
	const {
		authContext: { isAuthenticated, role },
	} = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/');
		} else if (isAuthenticated && role !== 'admin') {
			message.error('You do not have permission to view this page');
			navigate('/unthorized');
		}
	}, [navigate, role, isAuthenticated]);

	return <div>{children}</div>;
};

export default AdminGuard;
