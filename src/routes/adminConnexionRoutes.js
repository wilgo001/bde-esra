import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { BACKEND_URL } from ".";
import { LogIn } from "../app/adminLogSlice";

export const useAdminLogInPOST = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return((user, pwd) => {
        const requestOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: user, password: pwd})
        };
        fetch(`${BACKEND_URL}admin/login`, requestOption)
            .then(rsp => rsp.json())
            .then(data => {
                const token = data.token;
                dispatch(LogIn(token));
                navigate("/admin");
            })
    })
}

export const useAdminSweatImagePOST = (id) => {
    const token = useSelector((state) => state.adminLog.token);
    return((file) => {
        const data = new FormData();
        data.append('id', id);
        data.append('file', file);
        const requestOption = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token
            },
            body: data
        }
        return fetch(`${BACKEND_URL}admin/sweat/image`, requestOption)
            .then(rsp => rsp.json())
            .then(data => data);
    })
}

export const useAdminSweatImageGET = (id) => {
    const token = useSelector((state) => state.adminLog.token);
    return((filename) => {
        const requestOption = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            },
        }
        return fetch(`${BACKEND_URL}admin/sweat/image?id=${id}&filename=${filename}`, requestOption)
            .then(rsp => rsp.blob())
            .then(blob => URL.createObjectURL(blob));
    })
}

export const useAdminSweatImageDELETE = (id) => {
    const token = useSelector((state) => state.adminLog.token);
    return((filename) => {
        const requestOption = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                filename: filename,
            })
        }
        return fetch(`${BACKEND_URL}admin/sweat/image`, requestOption)
            .then(rsp => rsp.json())
            .then(data => data);
    })
}

export const useAdminManySweatGET = () => {
    const token = useSelector((state) => state.adminLog.token);
    const requestOption = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    }
    return(async () => {
        return await fetch(`${BACKEND_URL}admin/sweat`, requestOption)
            .then(rsp => rsp.json())
            .then(data => data);
    })
}

export const useAdminOneSweatGET = (id) => {
    const token = useSelector((state) => state.adminLog.token);
    const requestOption = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    }
    return(async () => {
        return await fetch(`${BACKEND_URL}admin/sweat?_id=${id}`, requestOption)
            .then(rsp => rsp.json())
            .then(data => data);
    })
}

export const useAdminSweatsPOST = () => {
    const token = useSelector((state) => state.adminLog.token);
    return(async (data) => {
        const requestOption = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
        console.log(JSON.stringify(data));
        return await fetch(`${BACKEND_URL}admin/sweat`, requestOption)
            .then(rsp => rsp.json())
            .then(data => data);
    })
}

export const useAdminSweatsPUT = (id) => {
    const token = useSelector((state) => state.adminLog.token);
    return(async (promo, color) => {
        console.log(promo);
        const requestOption = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: id,
                promo: promo,
                color: color,
            })
        }
        return await fetch(`${BACKEND_URL}admin/sweat`, requestOption)
            .then(rsp => rsp.json())
            .then(data => data);
    })
}

// const useAdminLoggedInGET = () => {
//     const isLogged = useSelector((state) => state.adminLog.isLogged);
//     const token = useSelector((state) => state.adminLog.token);
//     const dispatch = useDispatch();

//     return(() => {
//         const RequestOption = {
//             method: "GET",

//         }
//     })

// }