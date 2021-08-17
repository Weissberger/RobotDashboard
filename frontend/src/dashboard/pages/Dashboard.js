import React, {useState} from 'react';
import Header from '../components/Header.js';
import Actions from '../components/Actions.js';
import Queue from '../components/Queue.js';
import RobotStats from '../components/RobotStats.js';
import useRobotSimulator from '../../shared/components/CustomHooks/RobotSimulator.js'


const Dashboard = () => {
    const [queue, setQueue] = useState([]);
    const {battery, height, position, currentMission, lastMissionHistory, simRunning} = useRobotSimulator(queue, setQueue);
   
    return (
    <>
    <Header/>
    <div className='p-4 flex flex-col justify-center'>
        <RobotStats battery={battery} height={height} position={position} currentMission={currentMission}/>
        <Actions setQueue={setQueue} queue={queue} />
        <Queue queue={queue} setQueue={setQueue} lastMissionHistory={lastMissionHistory} battery={battery} simRunning={simRunning}/>
    </div>
    </>
    )
}

export default Dashboard