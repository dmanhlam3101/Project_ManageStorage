const { Header, Content, Footer, Sider } = Layout;
import React, { useContext } from 'react';


const Sidebar = () => {
<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
}
export default Sidebar;
