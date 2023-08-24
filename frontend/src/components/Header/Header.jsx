import React, { useContext, useState } from 'react'
import { Header as HeaderAntd } from 'antd/lib/layout/layout';
import { Button, Menu, Modal, message, theme } from 'antd';
import {

    CaretDownOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import LogOutConfirm from '../../views/Login/LogOutConfirm';
import { logout } from '../../services/authService';
const Header = () => {
    const [logOutModalOpen, setLogOutModalOpen] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const {
        authContext: { username },
    } = useContext(AuthContext);
    const UserDropdown = ({ onClick }) => (
        <Button style={{width:'100px'}} onClick={onClick}>Logout</Button>
    );

    const navItems = [
        {
            label: (
                <>
                    {username}   
                </>
            ),
            key: 'username',
            
        },
        {
            label: (
                <>
                    <Button style={{width:'80px'}} onClick={() => setLogOutModalOpen(true)}>Logout</Button>
                </>
            ),
            key: 'logout',
            
        },
    ];
    return (
        <>
            <LogOutConfirm
                logOutModalOpen={logOutModalOpen}
                setLogOutModalOpen={setLogOutModalOpen}
            />

            <HeaderAntd
                style={{
                    padding: 0,
                    background: colorBgContainer,
                    height: '66px',
                }}
            >
                <div style={{ float: 'right', marginRight: '40px' }}>
                    <Menu mode='horizontal' items={navItems} disabledOverflow></Menu>
                </div>

            </HeaderAntd>
        </>
    )
}

export default Header