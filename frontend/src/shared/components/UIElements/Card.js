import React from 'react'

const Card = (props) => {
    return (
        <div className='flex flex-col p-4 m-4 bg-gray-400 shadow-lg border border-gray-900 h-64 rounded'>
            {props.children}
        </div>
    )
}

export default Card;