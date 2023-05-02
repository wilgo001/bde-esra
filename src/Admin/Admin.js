import "./Admin.css";
import { Outlet, useNavigate, } from "react-router-dom";
import { AdminMenu } from "./AdminComponents";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { BACKEND_URL } from "../routes";

const AdminLayout = (props) => {
    const token = useSelector((state) => state.adminLog.token);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BACKEND_URL}admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
        }).then((rsp) => {
            if(rsp.status === 401) {
                navigate("/admin/login");
            }
        })
    }, [token])

    return(
    <div className="admin-layout">
        <AdminMenu/>
        <Outlet/>
    </div>)
}

export default AdminLayout;