import React, {useEffect, useState} from 'react';

const Queue = (props) => {
    const {queue, setQueue} = props;

    useEffect(()=> {
        if(!queue.length) return;
        if(queue[0].status === 'queued'){
            console.log('setting queue', [{...queue[0], status:'running'}, ...queue.slice(1, queue.length)])
            setQueue(queue => [{...queue[0], status:'running'}, ...queue.slice(1, queue.length)])
        }
    }, [queue])

    return (
        <div className='flex flex-col p-4 m-4 bg-gray-400 border border-gray-900 h-64 rounded'>
            <h1 className='text-white'>Queue</h1>
            <div className='w-6/12 h-40 overflow-y-scroll overflow-y-visible bg-gray-200 my-4 mx-auto p-2 border border-gray-800'>
                {!queue.length && <span className='text-gray-800 font-semibold m-2'>Select an action to add to the queue</span>}
                {
                    queue.map(item=>
                        <div className='flex flex-row justify-between rounded m-2 bg-gray-800 text-white'>
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