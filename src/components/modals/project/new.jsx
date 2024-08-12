import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ArrowLongLeftIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select'

export default function NewProject({open, setOpen}) {

    const [nameErr, setNameErr] = useState(false);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const org = useSelector((state) => state.auth.organization);
    const departments = useSelector((state) => state.auth.departments);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          if (accessToken && org) {
            try {
              const response = await fetch(`http://localhost:3000/user/org/${org.id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
              });
    
              if (response.ok) {
                const data = await response.json();
                setUsers(data);
              } else {
                console.error('Failed to fetch users:', response.statusText);
              }
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          }
        };
    
        fetchUsers();
    }, [accessToken, org]);
    const collabs = users?.map(user => ({ value: user.id, label: user.firstname + ' ' + user.lastname }))
    const deptOptions = departments?.map(dept => ({
      value: dept.id,
      label: dept.name?.en
    }))

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl sm:py-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="">
                <div className="flex gap-x-4 items-center mb-8 px-6">
                    <button onClick={()=>setOpen(false)}>
                    <ArrowLongLeftIcon className='text-gray-900 w-6'/>
                    </button>
                    <DialogTitle as="h3" className="text-xl font-normal leading-6 text-gray-900">
                    Add New Project
                    </DialogTitle>
                </div>
                <div className="overflow-auto lg:max-h-96">
                  <div className='px-6'>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Project Name*
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Project name"
                          aria-invalid="false"
                          aria-describedby="name-error"
                          className={`block w-full rounded-md border-0 py-1.5 pl-2 pr-10 ${nameErr ? ('text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500') : ('text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600')} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                          />
                          {nameErr && (
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
                          </div>
                          )}
                      </div>
                      {nameErr && (
                      <p id="email-error" className="mt-2 text-sm text-red-600">
                          Project name required
                      </p>
                      )}
                    </div>
                    <div className='mt-6'>
                      <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                        Project Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={''}
                        />
                      </div>
                    </div>
                    <div className='mt-6'>
                      <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                        Assign Project Lead
                      </label>
                      <div className='mt-2'>
                        <Select options={collabs} />
                      </div>
                    </div>
                    <div className='mt-6'>
                      <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                        Department
                      </label>
                      <div className='my-2'>
                        <Select options={deptOptions} />
                      </div>
                    </div>
                    <div className='my-6'>
                      <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                        Project Members
                      </label>
                      <div className='mt-2'>
                        <Select isMulti={true} options={collabs} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 px-6 flex justify-end gap-x-4 items-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="secondary-btn"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="primary-btn"
              >
                Confirm
              </button>
            </div>
            {/* <div className="mt-5 sm:mt-6 px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back to dashboard
              </button>
            </div> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
