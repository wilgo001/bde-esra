import { useEffect, useState } from "react";
import { InputSelect, InputText } from "../../../../Components";
import { useAdminOneSweatGET, useAdminSweatImageDELETE, useAdminSweatImagesGET, useAdminSweatImagePOST, useAdminSweatsPUT } from "../../../../routes/adminConnexionRoutes";
import "./AdminSweatCard.css";
import AdminSweatImageViewer from "../AdminSweatImageViewer/AdminSweatImageViewer";

const promoList = [
    "ESRA",
    "ISTS",
    "ESRAnim"
]

const AdminSweatCard = (props) => {
    const id = props.id;
    const [ promo, setPromo ] = useState(props.promo);
    const [ color, setColor ] = useState({name: props.color.name, hex: props.color.hex});
    const className = props.className;
    const getSweat = useAdminOneSweatGET(id);
    const putSweat = useAdminSweatsPUT(id);

    const [ isEdit, setEdit ] = useState(false);

    const readMode = <div className="admin-sweat-image-editor read-mode-container">
        <p className="admin-sweat-image-editor read-mode-promo">{`promo : ${promo}`}</p>
        <p className="admin-sweat-image-editor read-mode-color-name">{`color name : ${color.name}`}</p>
        <p className="admin-sweat-image-editor read-mode-color-hex">{`color hex : ${color.hex}`}</p>
        <div className="admin-sweat-image-editor color-demo" style={{backgroundColor: color.hex}}/>
        <button onClick={(e) =>setEdit(true)}>EDIT</button>
    </div>

    const editMode = <form className="admin-sweat-image-editor edit-mode-container" onSubmit={(e) => {e.preventDefault(); sendNewDataAndFetch()}}>
        <InputSelect id={`admin-sweat-image-editor-${id}-promo`} label="promo" options={promoList} selected={promo} onChange={(v) =>onChangePromo(v)}/>
        <InputText id={`admin-sweat-image-editor-${id}-promo`} label="nom de la couleur" value={color.name} onChange={(v) => onChangeNameColor(v)}/>
        <InputText type="color" id={`admin-sweat-image-editor-${id}-promo`} label="hex de la couleur" vaalue={color.hex} onChange={v => onChangeHexColor(v)}/>
        <input type="submit"/>
    </form>

    //////////SWEAT DATA//////////

    /**
     * onChangePromo
     * @param {String} v the new value of promo
     * callback when promo input change
     * set promo to new value
     */
    const onChangePromo = (v) => {
        setPromo(v);
    }

    /**
     * onChangeHexColor
     * @param {String} v the new hex color value
     */
    const onChangeHexColor = (v) => {
        let c = color;
        c.hex = v;
        setColor(c);
    }
    
    /**
     * onChangeNameColor
     * @param {String} v the new name color value
     */
    const onChangeNameColor = (v) => {
        let c = color;
        c.name = v;
        setColor(c);
    }

    /**
     * updateData
     * @param {Object} data the data to update
     * 
     */
    const udpateData = async (data) => {
        setPromo(data.promo);
        setColor(data.color);
    }

    /**
     * fetchGetSweat
     * call get request and respond with new data, then update data
     */
    const fetchGetSweat = async () => {
        const data = await getSweat();
        await udpateData(data);
    }

    /**
     * sendNewDataAndFetch
     * send PUT request to update the sweat data
     * update sweat local data with the updated data in response
     */
    const sendNewDataAndFetch = async () => {
        setEdit(false);
        const rsp = await putSweat(promo, color);
        udpateData(rsp.data);
    }

    useEffect(()=> {
        fetchGetSweat();
    }, [])

    //////////RETURN COMPONENT//////////

    return(<div className={`admin-sweat-image-editor container ${className}`}>
        {!isEdit &&
            <AdminSweatImageViewer id={id} color={color} promo={promo} fetchData={() => fetchGetSweat()}/>
        }
        <div className="admin-sweat-image-editor">
            {isEdit
                ?editMode
                :readMode
            }
        </div>
    </div>)
}

export default AdminSweatCard;