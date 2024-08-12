import React from 'react'

function Priority({priority}) {
    switch (priority) {
        case 'low':
            return(
                <div className='w-full text-center py-2 bg-green-50 rounded-lg'>
                    <p className='text-green-700 font-medium text-xs'>Low</p>
                </div>
            )
            break;
        case 'medium':
            return(
                <div className='w-full text-center py-2 bg-orange-50 rounded-lg'>
                    <p className='text-orange-700 font-medium text-xs'>Medium</p>
                </div>
            )
            break;
        case 'high':
            return(
                <div className='w-full text-center py-2 bg-red-50 rounded-lg'>
                    <p className='text-red-700 font-medium text-xs'>High</p>
                </div>
            )
            break;
    
        default:
            return(
                <div className='w-full text-center py-2 bg-orange-50 rounded-lg'>
                    <p className='text-orange-700 font-medium text-xs'>Medium</p>
                </div>
            )
            break;
    }
}

export default Priority