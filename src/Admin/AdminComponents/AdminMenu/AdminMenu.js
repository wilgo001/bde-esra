import { Link } from "react-router-dom";
import { adminPageList } from "../../../app/Router";
import "./AdminMenu.css";

const AdminMenu = (props) => {
    const pages = adminPageList;
    return(
        <nav className={"admin-menu container"}>
            {pages.map((page) => <div className={"admin-menu page-container"} key={page.name}>
                <Link to={page.path} className={"admin-menu page-link"}>{page.name}</Link>
                {page.subMenu &&
                    <div className={"admin-menu sub-menu-container"}>
                        {page.subMenu.map((subPage) => 
                            <Link to={subPage.path} key={subPage.name} className={"admin-menu sub-page-link"}>{subPage.name}</Link>
                        )}
                    </div>
                }
            </div>)}
        </nav>
    )
}

export default AdminMenu