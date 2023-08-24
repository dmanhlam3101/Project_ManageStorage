import React, { useContext } from 'react';
import { Button, message, Modal } from 'antd';
import { logout } from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';

const LogOutConfirm = ({ logOutModalOpen, setLogOutModalOpen }) => {
	const { setAuthContext } = useContext(AuthContext);

	const handleLogOut = () => {
		logout();
		setAuthContext({
			isAuthenticated: false,
			username: null,
			role: null,
		});
		message.success('Logged out successfully!');
	};

	const handleCancel = () => {
		setLogOutModalOpen(false);
	};

	return (
		<Modal
			open={logOutModalOpen}
			title='Are you sure?'
			onCancel={handleCancel}
			width={380}
			footer={[
				<Button key='cancel' type='primary' danger onClick={handleLogOut}>
					Log out
				</Button>,
				<Button key='cancel' onClick={handleCancel}>
					Cancel
				</Button>,
			]}>
			<p>Do you want to log out?</p>
		</Modal>
	);
};

export default LogOutConfirm;
