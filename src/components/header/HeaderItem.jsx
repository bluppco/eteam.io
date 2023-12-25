const HeaderItemJSX = ( props ) => {

    return(
            <li className="px-4 py-4 hover:cursor-pointer tracking-wide">
                <a>
                    { props.children }
                </a>
            </li>
    )

}

export default HeaderItemJSX
