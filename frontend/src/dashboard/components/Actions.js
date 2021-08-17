import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
axios.defaults.withCredentials = true;

const RUN_SAME_MISSION_TIMER_SECONDS = 10;
const BATTERY_LOW_THRESHOLD_PCT = 50;

const Actions = (props) => {
    const {setQueue, lastMissionHistory, battery} = props;
    const location = useLocation();
    const {user} = location.state || {};

    const emailMissions = () => {
        axios.get('http://localhost:5000/api/missions/email-missions',)
        .then(res => {
            alert(`Successfully emailed you at ${user}`)
        })
        .catch(err => alert('Error sending history'))
    }

    const addToQueue = (missionType) => {
        const now = new Date().getTime()
        const surpassedTime = (now - lastMissionHistory[missionType])/1000 

        if(surpassedTime < RUN_SAME_MISSION_TIMER_SECONDS){
            return alert(`Cant run this mission, please wait ${(RUN_SAME_MISSION_TIMER_SECONDS - surpassedTime).toFixed(2)} seconds`)
        }
        if(battery < BATTERY_LOW_THRESHOLD_PCT){
            return alert('Battery too low for mission, need to recharge.')
        }
        setQueue(queue=>[...queue, {type:missionType, status: 'queued'}])
    }

    return (
        <div className='p-3 m-4 bg-gray-400 border border-gray-900 h-64 rounded'>
            <h1 className='text-white'>Actions</h1>
            <div className='flex flex-row justify-center p-6'>
                <button onClick={()=>addToQueue('guard')} className='m-4 w-28 h-24 bg-gray-800 rounded text-white focus:outline-white'>Guard</button>
                <button onClick={()=>addToQueue('patrol')} className='m-4 w-28 h-24 bg-gray-800 rounded text-white focus:outline-white'>Patrol</button>
                <button onClick={()=>addToQueue('quick scan')} className='m-4 w-28 h-24 bg-gray-800 rounded text-white focus:outline-white'>Quick Scan</button>
            </div>
            <button className='hover:underline font-semibold text-white mb-4 float-right' onClick={emailMissions}>Email Mission History</button>
        </div>
    )
}

export default Actions;