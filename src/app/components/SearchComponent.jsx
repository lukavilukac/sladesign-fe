import { assetUrl } from '@/app/helpers/assetUrl';
import React, {Fragment, useEffect, useState} from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import AxiosInstance from "@/app/api/AxiosInstance";
import {getSeeMoreTitle} from "@/app/Lang/LangHelper";

// const recent = [people[0], people[1], people[2], people[3], people[4]]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SearchComponent = ({locale}) => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const openModal = () => setOpen(true);

    const [autoCompleteData, setAutoCompleteData] = useState(null);

    useEffect(() => {
        AxiosInstance.get('products-and-categories',{
            headers: {
                Locale: locale
            }
        }).then((response) => {
            const getType = (type) => {
                switch (type) {
                    case 'category':
                        return 'categories';
                    case 'kategorija':
                        return 'kategorije';
                    default:
                        return type;
                }
            }

            const autocompleteData = response.data.map((item) => ({
                ...item,
                href: window.location.origin + '/' + getType(item.type) + '/' + item.slug
            }));

            setAutoCompleteData(autocompleteData);
        });
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value;
        if (query.length > 1) {
            const filteredData = autoCompleteData.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 20);
            setFilteredData(filteredData);
            setQuery(query);
        } else {
            setFilteredData([]);
            setQuery('');
        }
    }

    return (
        autoCompleteData && <>
            {/* Search Icon */}
            <button aria-label="Toggle visibility" onClick={openModal}>
                <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            <Transition.Root show={open} as={Fragment} afterLeave={() => setFilteredData([])} appear>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                                <Combobox onChange={(item) => (window.location = item.href)}>
                                    {({ activeOption }) => (
                                        <>
                                            <div className="relative">
                                                <MagnifyingGlassIcon
                                                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <Combobox.Input
                                                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm outline-0"
                                                    placeholder="Search..."
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            {(filteredData.length > 0) && (
                                                <Combobox.Options as="div" static hold className="flex transform-gpu divide-x divide-gray-100">
                                                    <div
                                                        className={classNames(
                                                            'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                                                            activeOption && 'sm:h-96'
                                                        )}
                                                    >
                                                        {query === '' && (
                                                            <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">Recent searches</h2>
                                                        )}
                                                        <div className="-mx-2 text-sm text-gray-700">
                                                            {(filteredData).map((item) => (
                                                                <Combobox.Option
                                                                    as="div"
                                                                    key={item.id}
                                                                    value={item}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            'flex cursor-default select-none items-center rounded-md p-2',
                                                                            active && 'bg-gray-100 text-gray-900'
                                                                        )
                                                                    }
                                                                >
                                                                    {({ active }) => (
                                                                        <>
                                                                            <img src={assetUrl(item.thumbnail_path)} alt="" className="h-6 w-6 flex-none rounded-full" />
                                                                            <span className="ml-3 flex-auto truncate">{item.name}</span>
                                                                            {active && (
                                                                                <ChevronRightIcon
                                                                                    className="ml-3 h-5 w-5 flex-none text-gray-400"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </Combobox.Option>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {activeOption && (
                                                        <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                                                            <div className="flex-none p-6 text-center">
                                                                <img src={assetUrl(activeOption.thumbnail_path)} alt="" className="mx-auto h-16 w-16 rounded-full" />
                                                                <h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
                                                                <p className="text-sm leading-6 text-gray-500">{activeOption.type}</p>
                                                            </div>
                                                            <div className="flex flex-auto flex-col justify-between p-6">
                                                                <a
                                                                    href={activeOption.href}
                                                                    className="mt-6 w-full rounded-md bg-rose-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                >
                                                                    {getSeeMoreTitle(locale)}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Combobox.Options>
                                            )}

                                            {query !== '' && filteredData.length === 0 && (
                                                <div className="px-6 py-14 text-center text-sm sm:px-14">
                                                    <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                                                    <p className="mt-4 font-semibold text-gray-900">No people found</p>
                                                    <p className="mt-2 text-gray-500">
                                                        We couldn’t find anything with that term. Please try again.
                                                    </p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Combobox>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>

    )
}

export default SearchComponent;
