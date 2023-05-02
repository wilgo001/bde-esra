import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { pageList } from "../../app/Router"
import "./Menu.css"
import { useEffect, useState } from "react"

export const page = {

    name:"",
    path: "",
    subMenu: [],
}

const Menu = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [navClassName, setNavClassName] = useState("");

    useEffect(() => {
      if(document.documentElement.clientWidth < 600) {
        if(menuOpen) {
            setNavClassName("");
        } else {
            setNavClassName("display-none");
        }
      } else {
        setNavClassName("");
    }
    }, [navClassName, menuOpen])
    
    const pages = pageList;
    return(
        <div className="menu container">
            <Link to="/" className="menu home-link">
                <img src="./logo192.png" className="menu home-link-logo" alt="logo"/>
            </Link>
            <div className="menu mobile-menu toggle-btn">
                {document.documentElement.clientWidth < 600 &&
                    menuOpen 
                        ? <FontAwesomeIcon icon={faXmark} className="menu mobile-menu close-btn " onClick={(e) => {setMenuOpen(false)}}/>
                        : <FontAwesomeIcon icon={faBars} className="menu mobile-menu open-btn " onClick={(e) => {setMenuOpen(true)}}/>
                }
            </div>
            <nav className={"menu menu-navigation " + (
                document.documentElement.clientWidth < 600 &&
                    (!menuOpen) &&
                        "display-none"
            )}>
                {pages.map((page) =>
                <div key={page.name} className={"menu page-container"}>
                    <Link to={page.path} className={"menu page-link"}>{page.name}</Link>
                    <div className={"menu sub-menu-navigation"}>
                        {page.subMenu?.map((subPage) =>
                            <Link to={subPage.path} key={subPage.name} className={"menu sub-page-link"}>{subPage.name}</Link>
                        )}
                    </div>
                </div>)}
            </nav>
        </div>
    )
}

export default Menu;
