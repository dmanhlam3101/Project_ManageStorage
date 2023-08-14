import React, { useState } from 'react';
import { Layout as LayoutAnt, Breadcrumb, Menu, theme ,Button} from 'antd';
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
const { Content, Header, Sider, Footer } = LayoutAnt;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const items = [
	getItem('Option 1', '1', <PieChartOutlined />),
	getItem('Option 2', '2', <DesktopOutlined />),
	getItem('User', 'sub1', <UserOutlined />, [
		getItem('Tom', '3'),
		getItem('Bill', '4'),
		getItem('Alex', '5'),
	]),
	getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
	getItem('Files', '9', <FileOutlined />),
];

const Layout = ({ title, children }) => {

	const [collapsed, setCollapsed] = useState(false);
	console.log(collapsed)
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (

		
		
		<LayoutAnt
			style={{
				minHeight: '100vh',
			}}
		>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				
				<div className="demo-logo-vertical img-with-left-padding"  ><img width={collapsed ? '100' : '200'} src='https://www.48hourslogo.com/oss/attachments/2023/01/11/23910145547/c2e7804da10ba06f2e9a2234d32be8e2.png'></img></div>

				
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
			</Sider>
			<LayoutAnt>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>

					
				</Header>
				<Content
					style={{
						margin: '0 16px',
					}}
				>
					<Breadcrumb
						style={{
							margin: '16px 0',
						}}
					>
						<Breadcrumb.Item>{title}</Breadcrumb.Item>
						
					</Breadcrumb>
					<div
						style={{
							padding: 24,
							minHeight: 630,
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
