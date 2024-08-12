import { ListBulletIcon, PlusIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Status from '../utilities/status';
import Priority from '../utilities/priority';

function ProjectDetails() {
    const { id } = useParams();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);

    const doneTasks = (task) => {
        let nbDone = 0;
        task.children?.map(child => child.status == 'done' && nbDone++);
        return nbDone;
    }

    useEffect(() => {
        const fetchProject = async () => {
          if (accessToken && id) {
            try {
              const response = await fetch(`http://localhost:3000/project/${id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
              });
    
              if (response.ok) {
                const data = await response.json();
                setProject(data);
              } else {
                console.error('Failed to fetch projects:', response.statusText);
              }
            } catch (error) {
              console.error('Error fetching projects:', error);
            }
          }
        };
    
        fetchProject();
    }, [accessToken, id]);

    useEffect(() => {
        const fetchTasks = async () => {
          if (accessToken && id) {
            try {
              const response = await fetch(`http://localhost:3000/task/project/${id}`, {
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
    }, [accessToken, id]);

  return (
    <div>
        {project && (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">{project.name}</h2>
                <div className="flex items-center gap-x-3">
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        New Task
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        New Section
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Task Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Assignee
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Priority
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Difficulty
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Department
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Start Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Due Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Subtasks
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tasks?.map((task) => (
                            <tr key={task.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {task.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{task.user?.firstname} {task.user?.lastname}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700"><Status task={task}/></td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700"><Priority priority={task.priority}/></td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{task.difficulty}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{task.department?.name.en}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{task.start_date}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{task.due_date}</td>
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
        )}
    </div>
  )
}

export default ProjectDetails