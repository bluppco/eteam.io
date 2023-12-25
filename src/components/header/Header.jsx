import { motion, useScroll, useAnimation, useMotionValueEvent } from "framer-motion"
import ContainerJSX from "../../layouts/Container"
import HeaderItemJSX from "./HeaderItem"
import HeaderMobile from "./HeaderMobile"

import { useState, useEffect } from "react"

const Header = () => {

    const [ isScrolled, setIsScrolled ] = useState( false )

    useEffect(() => {

        const handleScroll = () => {

          setIsScrolled( window.scrollY > window.innerHeight )

        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)

      }, [])

    const { scrollY } = useScroll()
    const squareVariants = {

        display: { y: 0, transition: { duration: .2 } },
        hide: { y: "-100%", transition: { duration: .4 } },

    }
    const controls = useAnimation( scrollY )
    useMotionValueEvent(scrollY, "change", (latest) => {

        let isScrollingDown = scrollY.getPrevious() - latest < 0;
        if( isScrollingDown && latest > 0 ){

            controls.start("hide")

        } else {

            controls.start("display")

        }


    })

    return(
        <>
            <header className="hidden md:block">
                <motion.header className={` ${ isScrolled ? "h-20 bg-white shadow-2xl" : "h-28 bg-transparent" } flex items-center fixed top-0 w-full z-50`}
                    variants={ squareVariants }
                    initial="display"
                    animate={ controls }
                >
                    <ContainerJSX>
                        <nav className="flex items-center justify-between">
                            <div className={` ${ isScrolled ? "block" : "hidden" } w-24 aspect-video`}>
                                <a href="/">
                                    <img
                                        src="/logo/dark-logo.svg"
                                        alt=""
                                        className="w-24 aspect-video"
                                    />
                                </a>
                            </div>
                            <div className={` ${ isScrolled ? "hidden" : "block" } w-36 aspect-video`}>
                                <a href="/">
                                    <img
                                        src="/logo/light-logo.svg"
                                        alt=""
                                        className="w-36 aspect-video"
                                    />
                                </a>
                            </div>
                            <div className="flex items-center gap-10">
                                <ul className={` ${ isScrolled ? "text-black" : "text-white" } flex gap-4`}>
                                    <HeaderItemJSX>Company</HeaderItemJSX>
                                    <HeaderItemJSX>Services</HeaderItemJSX>
                                    <HeaderItemJSX>Portfolio</HeaderItemJSX>
                                    <HeaderItemJSX>Careers</HeaderItemJSX>
                                    <HeaderItemJSX>Blog</HeaderItemJSX>
                                </ul>
                                <button className={` ${ isScrolled ? "border-black" : "" } h-12 px-8 flex items-center border justify-center bg-white rounded`}>Get a quote</button>
                            </div>
                        </nav>
                    </ContainerJSX>
                </motion.header>
            </header>
            <HeaderMobile />
        </>
    )

}

export default Header
