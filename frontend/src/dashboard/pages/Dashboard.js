import React, {useEffect, useState} from 'react';
import Header from '../components/Header.js';
import Actions from '../components/Actions.js';
import Queue from '../components/Queue.js';
import RobotStats from '../components/RobotStats.js';
import {useHistory} from 'react-router-dom';
import useRobotSimulator from '../../shared/components/CustomHooks/RobotSimulator.js'


const Dashboard = () => {
    const [activeMission, setActiveMission] = useState('');
    const [queue, setQueue] = useState([]);
    let history = useHistory();
    const {battery, height, position, currentMission, lastMissionHistory} = useRobotSimulator(queue, setQueue);
   
    return (
    <>
    <Header/>
    <div className='p-4 flex flex-col justify-center'>
        <RobotStats battery={battery} height={height} position={position} currentMission={currentMission}/>
        <Actions setQueue={setQueue} lastMissionHistory={lastMissionHistory} battery={battery}/>
        <Queue queue={queue} setQueue={setQueue}/>
    </div>
    </>
    )
}

export default Dashboard