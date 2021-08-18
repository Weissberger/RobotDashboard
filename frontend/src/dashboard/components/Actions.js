import React from 'react';
import axios from 'axios';
import Card from '../../shared/components/UIElements/Card.js';

axios.defaults.withCredentials = true;


const Actions = (props) => {
    const {setQueue} = props;

    const addToQueue = (missionType) => {
        setQueue(queue=>[...queue, {type:missionType, status: 'queued'}])
    }

    return (
        <Card>
            <h1 className='text-white font-semibold'>Actions</h1>
            <div className='flex flex-col md:flex-row justify-center items-center md:p-6'>
                <button onClick={()=>addToQueue('guard')} className='m-2 md:m-4 w-32 h-10 md:h-24 bg-gray-800 rounded text-white focus:outline-white hover:bg-gray-600 border border-indigo-400'>Guard</button>
                <button onClick={()=>addToQueue('patrol')} className='m-2 md:m-4 w-32 h-10 md:h-24 bg-gray-800 rounded text-white focus:outline-white hover:bg-gray-600 border border-indigo-400'>Patrol</button>
                <button onClick={()=>addToQueue('quick scan')} className='m-2 md:m-4 w-32 h-10 md:h-24 bg-gray-800 rounded text-white focus:outline-white hover:bg-gray-600 border border-indigo-400'>Quick Scan</button>
            </div>
            
        </Card>
    )
}

export default Actions;