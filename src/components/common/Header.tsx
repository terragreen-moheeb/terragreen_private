'use client'

import { useState, useEffect } from 'react'
import AuthAwareButtons from '../auth/AuthAwareButtons'
import Image from 'next/image'
import Link from 'next/link'


interface HeaderProps {
    fixed?: boolean;
}
export default function Header({ fixed = true }: HeaderProps) {
    const [isVisible, setIsVisible] = useState(true)

    // const [isScrolled, setIsScrolled] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Beide States in einem Update

            //   setIsScrolled(currentScrollY > 0)

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <div >
            <header
                className={`front-layout  pt-3 rounded-md  right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    } ${fixed ? 'fixed top-0 left-0' : ''} `}
            >    <div >
                    <div className="flex justify-between bg-white items-center rounded-md  py-0.5 px-1 ">

                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href={"/"}>
                                <Image
                                    src="/logo.svg"
                                    alt="Logo"
                                    width={144}
                                    height={58}
                                    className="w-[134px] object-contain"
                                    draggable={false}
                                />
                            </Link>
                        </div>


                        {/* Auth Buttons */}
                        <div className="flex items-center gap-1">
                            <AuthAwareButtons variant="nav" />

                        </div>
                    </div></div>
            </header>

        </div>
    )
}