import { PlusIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
    const { id } = useParams();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [project, setProject] = useState(null);

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
                            Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Assignee
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
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Edit</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {project.sections?.map((section) => (
                        <>
                            <tr key={section.id} className='bg-gray-100'>
                                <td colSpan={8} className="whitespace-nowrap py-4 pl-4 pr-3 text-base font-semibold text-indigo-900">
                                {section.name}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit<span className="sr-only"></span>
                                </a> */}
                                </td>
                            </tr>
                            {section?.tasks?.map((task) => (
                            <tr key={section.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {task.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.status}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.user?.firstname} {task.user?.lastname}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.priority}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.difficulty}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.department?.name.en}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.start_date}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.due_date}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit<span className="sr-only"></span>
                                </a>
                                </td>
                            </tr>
                            ))}
                        </>
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