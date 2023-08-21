import React, { useContext, useState } from 'react';
import { Layout as LayoutAnt, Menu, theme ,message} from 'antd';
import {
	HomeOutlined,
	FormOutlined,
	CaretDownOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { logout } from '../../services/authService';

const { Content, Header, Sider, Footer } = LayoutAnt;


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

	
];

const Layout = ({ title, children }) => {

	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const {
		authContext: { username },
	} = useContext(AuthContext);
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

	const navItems = [
		{
			label: (
				<>
					{username} <CaretDownOutlined />
				</>
			),
			key: 'username',
			children: [
				{
					key: 'log-out',
					label: <Link
					  onClick={() => handleLogOut()}
					>Logout</Link>,
				},
			],
		},
	];


	return (



		<LayoutAnt
			style={{
				minHeight: '100vh',
			}}
		>
			<Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

				<div className="demo-logo-vertical img-with-left-padding"  ><img width={collapsed ? '100' : '250'} src='https://www.48hourslogo.com/oss/attachments/2023/01/11/23910145547/c2e7804da10ba06f2e9a2234d32be8e2.png'></img></div>


				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
			</Sider>
			<LayoutAnt>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<div style={{float:'right',marginRight:'40px'}}>
						<Menu mode='horizontal' items={navItems} disabledOverflow></Menu>
					</div>

				</Header>
				<Content
					style={{
						margin: '0 16px',
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
				<Footer
					style={{
						textAlign: 'center',
					}}
				>
					Ant Design ©2023 Created by Ant UED
				</Footer>
			</LayoutAnt>
		</LayoutAnt>


	);
};

export default Layout;
