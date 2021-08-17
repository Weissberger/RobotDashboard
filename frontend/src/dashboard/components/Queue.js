import React, {useState} from 'react';
import {useInterval} from '../../shared/components/CustomHooks/Utilities'

const RUN_SAME_MISSION_TIMER_SECONDS = 30;
const BATTERY_LOW_THRESHOLD_PCT = 95;

const Queue = (props) => {
    const {queue, setQueue, lastMissionHistory, battery, simRunning} = props;
    const [queueIntervalMS, setQueueIntervalMS] = useState(1000);

    const actionCanRun = (action) => {
        const now = new Date().getTime()
        const surpassedTime = (now - lastMissionHistory[action])/1000 
        if(surpassedTime > RUN_SAME_MISSION_TIMER_SECONDS){
            // return alert(`Cant run this mission, please wait ${(RUN_SAME_MISSION_TIMER_SECONDS - surpassedTime).toFixed(2)} seconds`)
            return true
        }
        return false;
    }

    useInterval(()=> {
        if(!queue.length || simRunning) return;
        if(battery < BATTERY_LOW_THRESHOLD_PCT){
            alert('Battery too low for mission, need to recharge.')
            return setQueueIntervalMS(null)
        }
        for(const [index, item] of queue.entries()){
            if(item.status === 'queued'){
                if(!actionCanRun(item.type)) continue;
                const newQueue = [...queue]
                newQueue.splice(index, 1)
                setQueue(queue => 
                    [{...item, status:'running'}, ...newQueue]
                );
            }
        }  
    }, queueIntervalMS)


    return (
        <div className='flex flex-col p-4 m-4 bg-gray-400 border border-gray-900 h-64 rounded'>
            <h1 className='text-white'>Queue</h1>
            <div className='w-6/12 h-40 overflow-y-scroll overflow-y-visible bg-gray-200 my-4 mx-auto p-2 border border-gray-800'>
                {!queue.length && <span className='text-gray-800 font-semibold m-2'>Select an action to add to the queue</span>}
                {
                    queue.map((item, idx) =>
                        <div key={idx} className='flex flex-row justify-between rounded m-2 bg-gray-800 text-white'>
                            <span className='m-2'>{item.type}</span>
                            <span className='m-2'>{item.status}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Queue;