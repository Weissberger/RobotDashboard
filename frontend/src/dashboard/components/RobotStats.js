import React from 'react';


const Stat = ({statName, statValue}) => {
    return (
        <div className='flex flex-row mr-2 mb-4'>
            <span className='text-gray-800 font-semibold mr-2'>{`${statName}:`}</span>
            <span className='text-white'>{`${statValue}`}</span>
        </div>
    )
}


const RobotStats = (props) => {
    const {battery, height, position, currentMission} = props;
    const {x, y, z} = position;
    return (
        <div className='p-3 m-4 bg-gray-400 border border-gray-900 h-64 rounded'>
            <h1 className='text-white mb-3'>Robot Stats</h1>
            <div className='flex flex-col pl-12'>
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
        </div>
    )
}

export default RobotStats