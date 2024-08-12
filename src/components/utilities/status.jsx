import React from 'react'

function Status({task}) {
    switch (task.status) {
        case 'backlog':
            return(
                <div className='w-full text-center py-2 bg-gray-50 rounded-lg'>
                    <p className='text-gray-800 font-medium text-xs'>Backlog</p>
                </div>
            )
            break;
        case 'todo':
            return(
                <div className='w-full text-center py-2 bg-gray-50 rounded-lg'>
                    <p className='text-gray-800 font-medium text-xs'>Todo</p>
                </div>
            )
            break;
        case 'in progress':
            return(
                <div className='w-full text-center py-2 bg-blue-50 rounded-lg'>
                    <p className='text-blue-700 font-medium text-xs'>In Progress</p>
                </div>
            )
            break;
        case 'qa required':
            return(
                <div className='w-full text-center py-2 bg-orange-50 rounded-lg'>
                    <p className='text-orange-700 font-medium text-xs'>QA required</p>
                </div>
            )
            break;
        case 'testing':
            return(
                <div className='w-full text-center py-2 bg-orange-50 rounded-lg'>
                    <p className='text-orange-700 font-medium text-xs'>Under review</p>
                </div>
            )
            break;
        case 'canceled':
            return(
                <div className='w-full text-center py-2 bg-red-50 rounded-lg'>
                    <p className='text-red-700 font-medium text-xs'>Canceled</p>
                </div>
            )
            break;
        case 'done':
            return(
                <div className='w-full text-center py-2 bg-green-50 rounded-lg'>
                    <p className='text-green-700 font-medium text-xs'>Done</p>
                </div>
            )
            break;
    
        default:
            return(
                <div className='w-full text-center py-2 bg-gray-50 rounded-lg'>
                    <p className='text-gray-800 font-medium text-xs'>Backlog</p>
                </div>
            )
            break;
    }
}

export default Status