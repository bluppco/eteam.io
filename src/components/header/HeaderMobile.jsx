import { motion, useScroll, useAnimation, useMotionValueEvent } from "framer-motion"
import ContainerJSX from "../../layouts/Container"

import { useState, useEffect } from "react"

const HeaderMobile = () => {

    const [ isScrolled, setIsScrolled ] = useState( false )

    useEffect(() => {

        const handleScroll = () => {

            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollThreshold = 0.4 * windowHeight;

            setIsScrolled(scrollPosition > scrollThreshold);

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
            <header className="md:hidden">
                <motion.header className={` ${ isScrolled ? "bg-white shadow-2xl" : "bg-transparent" } h-20 flex items-center fixed top-0 w-full z-50`}
                    variants={ squareVariants }
                    initial="display"
                    animate={ controls }
                >
                    <ContainerJSX>
                        <nav className="flex items-center">
                            <div className={` ${ isScrolled ? "block" : "hidden" } w-24 aspect-video`}>
                                <a href="/">
                                    <img
                                        src="/logo/dark-logo.svg"
                                        alt=""
                                        className="w-24 aspect-video"
                                    />
                                </a>
                            </div>
                            <div className={` ${ isScrolled ? "hidden" : "block" } w-24 aspect-video`}>
                                <a href="/">
                                    <img
                                        src="/logo/light-logo.svg"
                                        alt=""
                                        className="w-24 aspect-video"
                                    />
                                </a>
                            </div>
                        </nav>
                    </ContainerJSX>
                </motion.header>
            </header>
        </>
    )

}

export default HeaderMobile
