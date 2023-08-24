import React, { useContext, useState } from 'react';
import { Layout as LayoutAnt, Menu, theme, message, Button, Modal } from 'antd';
import {
	HomeOutlined,
	FormOutlined,
	CaretDownOutlined,
	UserOutlined,
	BarChartOutlined,
	CarryOutOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { logout } from '../../services/authService';
import logo from '../../images/logo.png';
import LogOutConfirm from '../../views/Login/LogOutConfirm';
import Header from '../../components/Header/Header';
const { Content, Sider } = LayoutAnt;


const items = [
	{
		label: <Link to='/storage'>Storage</Link>,
		key: 'storage',
		icon: <HomeOutlined />
	},
	{
		label: <Link to='/inputStorage'>Input Storage</Link>,
		key: 'inputStorage',
		icon: <FormOutlined />
	},
	{
		label: <Link to='/outputStorage'>Output Storage</Link>,
		key: 'outputStorage',
		icon: <CarryOutOutlined />
	},

	{
		label: <Link to='/dashboard'>Dasboard</Link>,
		key: 'dashboard',
		icon: <BarChartOutlined />
	},

];

const itemsAdmin = [
	{
		label: <Link to='/storage'>Storage</Link>,
		key: 'storage',
		icon: <HomeOutlined />
	},
	{
		label: <Link to='/inputStorage'>Input Storage</Link>,
		key: 'inputStorage',
		icon: <FormOutlined />
	},
	{
		label: <Link to='/outputStorage'>Output Storage</Link>,
		key: 'outputStorage',
		icon: <CarryOutOutlined />
	},
	{
		label: <Link to='/customer'>Customer</Link>,
		key: 'customer',
		icon: <UserOutlined />
	},
	{
		label: <Link to='/dashboard'>Dasboard</Link>,
		key: 'dashboard',
		icon: <BarChartOutlined />
	},

];

const Layout = ({ title, children }) => {
	const {
		authContext: { role },
	} = useContext(AuthContext);
	const location = useLocation();
	const selectedKey = location.pathname.split('/')[1];
	const [logOutModalOpen, setLogOutModalOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	
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

	

	return (



		<LayoutAnt
			style={{
				minHeight: '100vh',
			}}
		>
			<Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

				<div className="demo-logo-vertical img-with-left-padding "
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				><img width={collapsed ? '100' : '250'} src={logo}></img></div>


				<Menu theme="dark" 
				defaultSelectedKeys={selectedKey} 
				mode="inline" 
				
				items={role === 'admin' ? itemsAdmin : items}
				 />
			</Sider>		
				<LayoutAnt>
				<Header/>
				<Content
					style={{
						margin: '0 16px',
						height: `calc(100vh - 66px - 62px)`,
					}}
				>
					<div
						style={{
							margin: '16px 0px ',

						}}
					>


						<a
							style={{
								fontWeight: 'bold',
								fontSize: '30px',
								color: 'red',
								background: '#f5f5f5',
							}}
						>
							{title}
						</a>
					</div>
					<div
						style={{
							padding: 24,
							minHeight: 590,
							background: colorBgContainer,
						}}
					>
						
						
						{children}
					</div>
				</Content>

			</LayoutAnt>
		</LayoutAnt>


	);
};

export default Layout;
