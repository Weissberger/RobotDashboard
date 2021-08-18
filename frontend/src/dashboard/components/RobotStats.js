import React from 'react';
import Card from '../../shared/components/UIElements/Card.js';

const Stat = ({statName, statValue}) => {
    return (
        <div className='flex flex-row justify-center items-center mr-2 mb-4'>
            <span className='text-gray-800 font-semibold mr-2'>{`${statName}:`}</span>
            <span className='text-white'>{`${statValue}`}</span>
        </div>
    )
}


const RobotStats = (props) => {
    const {battery, height, position, currentMission} = props;
    const {x, y, z} = position;
    return (
        <Card>
            <h1 className='text-white mb-3 font-semibold'>Robot Stats</h1>
            <div className='flex flex-col items-center'>
                <Stat statName='Current Mission' statValue={currentMission}/>
                <Stat statName='Battery' statValue={`${battery}%`}/>
                <Stat statName='Height' statValue={height}/>
                <span className='text-gray-800 font-semibold'>Position:</span>
                <div className='flex flex-row ml-4 p-2'>
                    <Stat statName='X' statValue={x}/>
                    <Stat statName='Y' statValue={y}/>
                    <Stat statName='Z' statValue={z}/>
                </div>
            </div>
        </Card>
    )
}

export default RobotStats