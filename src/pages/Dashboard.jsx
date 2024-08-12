import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Priority from '../components/utilities/priority';
import Status from '../components/utilities/status';
import { ListBulletIcon } from '@heroicons/react/20/solid';

function Dashboard() {

  const accessToken = useSelector((state) => state.auth.accessToken);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      const fetchTasks = async () => {
        if (accessToken) {
          try {
            const response = await fetch(`http://localhost:3000/task/mine`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
            });
  
            if (response.ok) {
              const data = await response.json();
              setTasks(data);
            } else {
              console.error('Failed to fetch tasks:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        }
      };
  
      fetchTasks();
  }, [accessToken]);

  useEffect(()=>{},[tasks]);

  function firstTwo(str) {
    const words = str.split(' ');
    if (words.length > 2) {
      return `${words[0]} ${words[1]}...`;
    } else {
      return str;
    }
  }

  const doneTasks = (task) => {
    let nbDone = 0;
    task.children?.map(child => child.status == 'done' && nbDone++);
    return nbDone;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className='p-4 border border-indigo-100 rounded-xl h-fit'><div>Recent Documents</div></div>
        <div className='p-4 border border-indigo-100 rounded-xl h-fit'>
          <div className="flex justify-between items-end">
            <p className="text-base font-medium">My Tasks</p>
            <Link to={'/projects'} className="text-sm underline">See all</Link>
          </div>
          <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full">
                  <thead className='ring-1 ring-indigo-200 rounded-full'>
                    <tr className='bg-indigo-50'>
                      <th scope="col" className="rounded-l-full py-2 pl-4 pr-3 text-center text-sm font-normal text-gray-900 sm:pl-0">
                        Title
                      </th>
                      <th scope="col" className="px-3 py-2 text-center text-sm font-normal text-gray-900">
                        Priority
                      </th>
                      <th scope="col" className="px-3 py-2 text-center text-sm font-normal text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-2 text-center text-sm font-normal text-gray-900">
                        Due Date
                      </th>
                      <th scope="col" className="rounded-r-full px-3 py-2 text-center text-sm font-normal text-gray-900">
                        Subtasks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tasks?.map((task) => (
                      <tr key={task.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3">
                          <p className='text-sm font-normal text-gray-900' title={task.name}>{firstTwo(task.name)}</p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 "><Priority priority={task.priority}/></td>
                        <td className="whitespace-nowrap px-3 py-4 "><Status task={task}/></td>
                        <td className="whitespace-nowrap px-3 py-4 ">{task.due_date}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 flex gap-x-2 justify-center">
                          <ListBulletIcon className='w-4'/>
                          <p>{doneTasks(task)}/{task.children?.length}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard