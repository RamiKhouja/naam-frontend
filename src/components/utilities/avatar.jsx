import React, { useEffect, useState } from 'react'

function Avatar({user, size}) {

    const [color, setColor] = useState(null);

    function getColorById(userId) {
        switch (userId % 7) {
          case 1:
            return 'bg-blue-100 ring-1 ring-blue-900 text-blue-900';
          case 2:
            return 'bg-red-100 ring-1 ring-red-900 text-red-900';
          case 3:
            return 'bg-yellow-100 ring-1 ring-yellow-900 text-yellow-900';
          case 4:
            return 'bg-gray-100 ring-1 ring-gray-700 text-gray-700';
          case 5:
            return 'bg-indigo-100 ring-1 ring-indigo-900 text-indigo-900';
          case 6:
            return 'bg-green-100 ring-1 ring-green-900 text-green-900';
          case 0:
            return 'bg-orange-100 ring-1 ring-orange-900 text-orange-900';
          default:
            return 'bg-blue-100 ring-1 ring-blue-900 text-blue-900';
        }
    }

    useEffect(()=>{
        setColor(getColorById(user.id));
    },[]);

    const getAcronym = (user) => {
        const fullName = user.firstname+' '+user.lastname;
        const words = fullName.trim().split(/\s+/);
        if (words.length >= 2) {
          const acronym = words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
          return acronym;
        } else if (words.length === 1) {
          return words[0][0].toUpperCase();
        } else {
          return '';
        }
    }

    if(user.image)
    return (
        <img
            alt=""
            src={`http://localhost:3000/uploads/users/${user.image}`}
            className={`inline-block ${size=='big' ? 'h-14 w-14' : 'h-8 w-8'} rounded-full`}
        />
    )
    else if(color) return (
        <div className={`inline-block ${size=='big' ? 'h-14 w-14' : 'h-8 w-8'} rounded-full ${color} p-2 flex items-center justify-center`}>
            <p className={`text-xs font-semibold`}>{getAcronym(user)}</p>
        </div>
    )
}

export default Avatar