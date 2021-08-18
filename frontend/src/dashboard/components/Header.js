import React from 'react';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import {useHistory, useLocation} from 'react-router-dom';
const axios = require("axios");

const Header = (props) => {
    const history = useHistory();
    const location = useLocation();
    const {user} = location.state || {};

    const logOutUser = () => {
        axios.get('http://localhost:5000/api/auth/logout')
                .then(res => {history.push('/login')})
                .catch(err => alert('Error loggin out.'))
    }
    const emailMissions = () => {
        axios.get('http://localhost:5000/api/missions/email-missions',)
        .then(res => {
            alert(`Successfully emailed you at ${user}`)
        })
        .catch(err => alert('Error sending history'))
    }

    return (
        <div className='w-full h-24 p-4 bg-gray-300 flex flex-row justify-between items-center border-b border-gray-800'>
            <div className='flex flex-row items-center'>
                <span className='inline-flex items-center font-blue mr-4 text-indigo-500 font-semibold'>{user}</span>
            </div>

            <Menu>
                <MenuButton className={'h-12 w-12 rounded-full bg-jetGrey text-ivory capitalize'}>
                    <img
                        alt='company-logo'
                        className={'object-cover overflow-hidden w-full h-full rounded-full'}
                        src={`http://localhost:5000/public/images/jpeg/company_logo.jpeg`}
                    />
                </MenuButton>
                <MenuList className='rounded-lg'>
                    <MenuItem onSelect={logOutUser} className='bg-gray-700 hover:bg-gray-600 p-4 rounded-t cursor-pointer'>
                        <span className={'text-white'} >Logout</span>
                    </MenuItem>
                    <MenuItem onSelect={emailMissions} className='bg-gray-700 hover:bg-gray-600 p-4 rounded-b cursor-pointer'>
                        <span className={'text-white'} >Email Mission History</span>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    )
}

export default Header;