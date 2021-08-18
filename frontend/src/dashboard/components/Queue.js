import React, {useState} from 'react';
import {useInterval} from '../../shared/components/CustomHooks/Utilities';
import Card from '../../shared/components/UIElements/Card.js';

const Queue = (props) => {
    const {queue, setQueue, lastMissionHistory, battery, simRunning} = props;
    const [queueIntervalMS, setQueueIntervalMS] = useState(parseInt(process.env.QUEUE_INTERVAL_MS));

    const actionCanRun = (action) => {
        const now = new Date().getTime()
        const surpassedTime = (now - lastMissionHistory[action])/1000 
        if(surpassedTime > parseInt(process.env.REACT_APP_RUN_SAME_MISSION_LOCKOUT_SECONDS)){
            return true
        }
        return false;
    }

    useInterval(()=> {
        if(!queue.length || simRunning) return;
        if(battery < parseInt(process.env.REACT_APP_BATTERY_LOW_THRESHOLD_PCT)){
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
        <Card>
            <h1 className='text-white font-semibold'>Queue</h1>
            <div className='w-6/12 h-40 overflow-y-scroll overflow-y-visible bg-gray-200 my-4 mx-auto p-2 border border-gray-800'>
                {!queue.length && <span className='text-gray-800 font-semibold'>Select an action to add to the queue</span>}
                {
                    queue.map((item, idx) =>
                        <div key={idx} className='flex flex-row justify-between rounded m-2 bg-gray-800 text-white'>
                            <span className='m-2'>{item.type}</span>
                            <span className='m-2'>{item.status}</span>
                        </div>
                    )
                }
            </div>
        </Card>
    )
}

export default Queue;