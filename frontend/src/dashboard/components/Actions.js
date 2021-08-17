import React from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
axios.defaults.withCredentials = true;


const Actions = (props) => {
    const {setQueue} = props;
    const location = useLocation();
    const {user} = location.state || {};

    const addToQueue = (missionType) => {
        setQueue(queue=>[...queue, {type:missionType, status: 'queued'}])
    }

    return (
        <div className='p-3 m-4 bg-gray-400 border border-gray-900 h-64 rounded'>
            <h1 className='text-white'>Actions</h1>
            <div className='flex flex-row justify-center p-6'>
                <button onClick={()=>addToQueue('guard')} className='m-4 w-32 h-24 bg-gray-800 rounded text-white focus:outline-white hover:bg-gray-600'>Guard</button>
                <button onClick={()=>addToQueue('patrol')} className='m-4 w-32 h-24 bg-gray-800 rounded text-white focus:outline-white hover:bg-gray-600'>Patrol</button>
                <button onClick={()=>addToQueue('quick scan')} className='m-4 w-32 h-24 bg-gray-800 rounded text-white focus:outline-white hover:bg-gray-600'>Quick Scan</button>
            </div>
            
        </div>
    )
}

export default Actions;