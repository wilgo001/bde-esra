import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAdminManySweatGET, useAdminSweatsPOST } from "../../../../routes/adminConnexionRoutes";
import { AdminSweatCard } from "../../../AdminComponents";
import "./AdminSweatParams.css";

const sweatParamTemplate = {
    promo: "ESRA",
    color: {
        name: "grey",
        hex: "#3f3f3f",
    }
}

const AdminSweatParams = (props) => {
    const getSweats = useAdminManySweatGET();
    const postNewSweat = useAdminSweatsPOST();
    const [ sweatList, setSweatList ] = useState([]);
    const fetch = async () => {
        await getSweats().then(data => {setSweatList(data)});
    }
    useEffect(() => {
        fetch();
    }, [])
    const onAddSweat = (e) => {
        postNewSweat(sweatParamTemplate);
        fetch();
    }
    return(
        <div className="admin-sweat-params container">
            {sweatList.map((sweat) => 
                <AdminSweatCard 
                    key={sweat._id}
                    id={sweat._id}
                    promo={sweat.promo}
                    files={sweat.filenames}
                    color={sweat.color}
                    reloadData={() => fetch()}
                    className="admin-sweatparams sweat-item"/>
            )}
            <div  className="admin-sweat-params add-new sweat-item" onClick={(e) => {onAddSweat(e)}} >
                <FontAwesomeIcon icon={faSquarePlus} className="admin-sweat-params add-new-btn"/>
            </div>
        </div>
    )
}

export default AdminSweatParams;