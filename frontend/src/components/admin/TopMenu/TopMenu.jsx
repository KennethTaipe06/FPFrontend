import React, { useEffect } from 'react';
import "./TopMenu.css";
import { Icon, Menu } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset, getUserInfo } from '../../../features/auth/authSlice';

export function TopMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, userInfo, isError, message } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    useEffect(() => {
        if (user && user.access && !userInfo) {
            dispatch(getUserInfo());
        }
    }, [dispatch, user, userInfo]);

    return (
        <Menu fixed='top' className='top-menu-admin' inverted>
            {/* Logo alineado a la izquierda */}
            <Menu.Item className='top-menu-admin__logo'>
                <p>UCElogo</p>
            </Menu.Item>

            {/* Elementos alineados a la derecha */}
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Icon name='user' />
                    <span>
                        {userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : "Cargando..."}
                    </span>
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>
                    <Icon name='sign-out' />
                    <span>Logout</span>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}
