'use client'

import React, { useState } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const NavBar = () => {
    // handle drop down when small screen later
    const [dropdownOpen, setDropdownOpen] = useState(true);

    const navItem = [
        {
            name: 'Forms',
            href: '/forms',
            sub: []
        },
        {
            name: 'Payments',
            href: '',
            sub: [
                {
                    name: 'Octopus',
                    href: '/payments/octopus'
                },
                {
                    name: 'Cash',
                    href: '/payments/cash'
                },
                {
                    name: 'Credit / Debit Card',
                    href: '/payments/cards'
                },
                {
                    name: 'Apple Pay',
                    href: '/payments/apple_pay'
                },
                {
                    name: 'Alipay',
                    href: '/payments/alipay'
                },
                {
                    name: 'Wechat Pay',
                    href: '/payments/wechat_pay'
                },
            ]
        }
    ]

    return (
        <div className="navbar sticky top-0 bg-base-300 shadow-md">
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" href='/'>SHC SC Finance</Link>
            </div>
            {/* <div className="flex-none md:hidden">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="btn">
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div> */}
            <div className={`flex-none ${dropdownOpen ? 'block' : 'hidden'} md:flex`}>
                <ul className="menu menu-horizontal px-1 text-lg">
                {navItem.map((item, index) => (
                    <li key={index}>
                        {item.sub.length > 0 ? (
                            <details>
                                <summary>{item.name}</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    {item.sub.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link href={subItem.href}>{subItem.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        ) : (
                            <Link href={item.href}>{item.name}</Link>
                        )}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default NavBar
