import React from 'react';
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


    return (
        <div className='w-full h-24 p-4 bg-gray-300 flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center'>
                <span className='inline-flex items-center font-blue mr-4'>{user}</span>
                <button className={'text-green-500 font-semibold hover:underline'} onClick={logOutUser}>Logout</button>
            </div>
            <div className={'h-10 w-10 rounded-full bg-jetGrey text-ivory capitalize'}>
                <img
                    className={'object-cover overflow-hidden w-full h-full rounded-full'}
                    src={`http://localhost:5000/public/images/jpeg/company_logo.jpeg`}
                />
			</div>
        </div>
    )
}

export default Header;