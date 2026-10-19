import {Fragment} from 'react'
import { Menu, Transition } from '@headlessui/react'
import {Locale} from "@/app/interfaces/locale";
import ReactCountryFlag from "react-country-flag";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const LangDropdown = ({locale}: {locale: Locale}) => {

    const countryCode = locale === 'sr' ? 'RS' : 'GB';

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <ReactCountryFlag countryCode={countryCode} style={{
                        fontSize: '1.5em',
                        lineHeight: '1.5em',
                    }} />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {locale === "sr" ? (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="/home"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        ENG <ReactCountryFlag countryCode={'GB'} />
                                    </a>
                                )}
                            </Menu.Item>
                        ) : (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="/"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        SRB <ReactCountryFlag countryCode={'RS'} />
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default LangDropdown;
