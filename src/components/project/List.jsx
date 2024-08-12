import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewProject from "../modals/project/new";

export default function ProjectList({projects}) {

  const user = useSelector(state => state.auth.userProfile);
  const [open, setOpen] = useState(false);

  const getStatus = (status) => {
      switch (status) {
          case 'not started':
            return (
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                  Not Started
              </span>
            )
          break;
          case 'in progress':
            return (
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                  In Progress
              </span>
            )
          break;
          case 'waiting':
            return (
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
                  Waiting
              </span>
            )
          break;
          case 'delayed':
            return (
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                  Delayed
              </span>
            )
          break;
          case 'done':
            return (
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Done
              </span>
            )
          break;
          default:
          return (
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                  Not Started
              </span>
          )
          break;
        }
  }
  return (
    <div>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">Projects</h2>
          {user.role === "admin"
          ? (
            <button
              type="button"
              onClick={()=>setOpen(true)}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-900 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              New Project
            </button>)
          : (<div></div>)
          }
          
        </div>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {projects && projects.map((project) => (
            <li key={project.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-neutral-50 shadow">
              <Link to={`/projects/${project.id}`}>
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-gray-900">{project.name}</h3>
                        {getStatus(project.status)}
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">{project.description}</p>
                  </div>
                </div>
              </Link>
            {/* <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                    <a
                    href={`mailto:${person.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    Email
                    </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                    <a
                    href={`tel:${person.telephone}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                    <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    Call
                    </a>
                </div>
                </div>
            </div> */}
            </li>
        ))}
        </ul>
        <NewProject open={open} setOpen={setOpen} />
    </div>
  )
}
