import { useState } from "react";
import { InputText } from "../../../Components";
import { useAdminLogInPOST } from "../../../routes/adminConnexionRoutes";
import "./AdminLogin.css";

const AdminLogin = (props) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] =useState("");
    const login = useAdminLogInPOST();

    return(
        <div className="admin-login container">
            <form className="admin-login sub-container" onSubmit={(e) => {
                    e.preventDefault();
                    login(username, password);
                }}>
                <InputText label={"Nom d'utilisateur"} id={"adminUsername"} onChange={(v) => setUsername(v)}/>
                <InputText label={"Mot de passe"} type={"password"} id={"adminPassword"} onChange={(v) => setPassword(v)}/>
                <input type={"submit"} className={"admin-login submit-btn"}/>
            </form>
        </div>
    )
}

export default AdminLogin;