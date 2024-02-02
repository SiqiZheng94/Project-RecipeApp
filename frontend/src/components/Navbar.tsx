import {useState} from "react";
import {faHome, faList, faCog } from "@fortawesome/free-solid-svg-icons";
import {Link , useLocation} from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
export default function NavBar(this: any) {

    const [showSidebar, setShowSidebar] = useState(false);
    const location = useLocation();
    const links= [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "Recipes",
            path: "/meals",
            icon: faList
        },
        {
            name: "Add-Recipe",
            path: "/add-recipe",
            icon: faCog
        }
    ]
    function closeSidebar(){
        setShowSidebar(false)
    }
    return (
        <>
            <div className="navbar container">
                <a href={"/"} className={"logo"}>Best<span>Recipe</span>App</a>
                <div className={"nav-links"}>
                    {
                        links.map(link => (
                            <Link className={location.pathname == link.path ? "sidebar-link active" : ""} to={link.path} key={link.name}>{link.name}</Link>
                        ))
                    }
                </div>
                <div
                    onClick={() => setShowSidebar(true)}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                    className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
                >
                    <div className={"bar"}></div>
                    <div className={"bar"}></div>
                    <div className={"bar"}></div>
                </div>
            </div>
            { showSidebar && <Sidebar close={closeSidebar} links={links} /> }
        </>
    );
}