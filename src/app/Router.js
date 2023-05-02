import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AdminHome, AdminPageAssocs, AdminPageHome, AdminSweatData, AdminSweatParams } from "../Admin";
import AdminLayout from "../Admin/Admin";
import AdminLogin from "../Admin/Pages/AdminLogin/AdminLogin";
import { Menu } from "../Components";
import { SweatEndPage, SweatFormPage, SweatStartPage, HomePage, NotFoundPage } from "../pages";

const Router = createBrowserRouter([
    /////////////////////GENERAL/////////////////////

    /**
     * page: menu
     * 
     * path: /
     * action:
     * desc: the top menu
     */
    {
        element: <><Menu/><Outlet/></>,
        path: "/",
        children:[   
            /**
            * page: HomePage
            * 
            * path: /
            * action:
            * desc: the arriving page
            */
            {
                element:<HomePage />,
                path: "/",
                index:true,
            },
            /**
                * page: NotFoundPage
                * 
                * path: *
                * action:
                * desc: the not found page
                */
            {
                element:<NotFoundPage />,
                path: '*'
            },

        ],
    },

    /////////////////////SWEAT ORDER PART/////////////////////
    /**
     * page: SweatStartPage
     * 
     * path: /sweat-order/
     * action: 
     * desc: the arriving page for sweat order
     * 
     */
    {
        element:<SweatStartPage/>,
        path:'/sweat-order/',

    },
    /**
     * page: SweatFormPage
     * 
     * path: /sweat-order/form
     * action: 
     * desc: the form for ordering sweat
     * 
     */
    {
        element:<SweatFormPage />,
        path:'/sweat-order/form',
    },
    /**
     * page: SweatEndPage
     * 
     * path: /sweat-order/end
     * action: 
     * desc: the pages appears when you finish your order
     * 
     */
    {
        element:<SweatEndPage />,
        path:'/sweat-order/end',
    },

    /////////////////////ADMIN PART/////////////////////
    /**
     * name: AdminMenu
     * path: /admin
     */

    {
        element:<AdminLayout/>,
        path: "/admin",
        errorElement: <Navigate to={"/admin/login"}/>,
        children: [
            {
                element: <AdminHome/>,
                index: true,
            },
            {
                element: <AdminPageHome/>,
                path: "page/home"
            },
            {
                element: <AdminPageAssocs/>,
                path: "page/assocs"
            },
            {
                element:<AdminSweatData/>,
                path: "sweat/data"
            },
            {
                element:<AdminSweatParams/>,
                path: "sweat/params"
            }
        ]
    },
    {
        element:<AdminLogin/>,
        path:"/admin/login",
    }
])

export const adminPageList = [
    {
        name: "Accueil",
        path: "/admin/home",
    },
    {
        name: "Pages",
        path: "/admin/page",
        subMenu: [
            {
                name: "Accueil",
                path: "/admin/page/home",
            },
            {
                name: "Les assocs",
                path: "/admin/page/assocs",
            }
        ]
    },
    {
        name: "Sweat",
        path: "/admin/sweat",
        subMenu: [
            {
                name: "Paramètres",
                path: "/admin/sweat/params",
            },
            {
                name: "données",
                path: "/admin/sweat/data",
            }
        ]
    },
]

export const pageList = [
    {
        name: "Les actus",
        path: "/actus",
        subMenu: [],
    },
    {
        name: "Les Assocs",
        path: "/association",
        subMenu: [
            {
                name: "Cine-Club",
                path: "/cine-club",
            },
            {
                name: "Sport",
                path: "/sport",
            },
            {
                name: "Culture",
                path: "/culture",
            },
            {
                name: "Professionnel",
                path: "/pro",
            }
        ],
    },
    {
        name: "Boite à Idée",
        path: "/boite-a-idee",
        subMenu: [],
    },
    {
        name: "Les Sweats",
        path: "/sweat-order",
        subMenu: [],
    },

]

export default Router;