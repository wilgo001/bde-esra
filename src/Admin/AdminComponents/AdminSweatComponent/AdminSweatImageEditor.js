import { faChevronCircleLeft, faChevronCircleRight, faCircleXmark as faCircleXmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark as faCircleXmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { InputSelect, InputText } from "../../../Components";
import { useAdminOneSweatGET, useAdminSweatImageDELETE, useAdminSweatImageGET, useAdminSweatImagePOST, useAdminSweatsPUT } from "../../../routes/adminConnexionRoutes";
import "./AdminSweatImageEditor.css";

const promoList = [
    "ESRA",
    "ISTS",
    "ESRAnim"
]

const AdminSweatImageEditor = (props) => {
    const id = props.id;
    const [ promo, setPromo ] = useState(props.promo);
    const [ fileList, setFileList] = useState(props.files);
    const [ openedFile, setOpenedFile ] = useState('input');
    const [ color, setColor ] = useState({name: props.color.name, hex: props.color.hex});
    const className = props.className;
    const post = useAdminSweatImagePOST(id);
    const getSweat = useAdminOneSweatGET(id);
    const getSweatImages = useAdminSweatImageGET(id);
    const putSweat = useAdminSweatsPUT(id);
    const deleteSingleImage = useAdminSweatImageDELETE(id);

    const [ isInput, setIsInput] = useState(false);
    const [ isEdit, setEdit ] = useState(false);
    const [ index, setIndex ] = useState(0);

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
    const udpateData = (data) => {
        setPromo(data.promo);
        setColor(data.color);
        setFileList(data.filenames);
    }

    /**
     * fetchGetSweat
     * call get request and respond with new data, then update data
     */
    const fetchGetSweat = async () => {
        const data = await getSweat();
        udpateData(data);
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

    //////////SWEAT IMAGES//////////

    /**
     * getOpenedFile
     * call the GET request
     * response with an image url
     * set the image url
     */
    const getOpenedFile = async () => {
        if(isInput || index >= fileList.length) {
            return;
        }
        const img = await getSweatImages(fileList[index]);
        console.log('old file: ', openedFile);
        console.log('new file: ', img);
        setOpenedFile(img);
        console.log('upt file: ', openedFile);
    }

    /**
     * postImage
     * @param {File} f the image to be sent to server
     * send image to post request
     * update index to response index
     * open the new image
     */
    const postImage = async (f) => {
        const rsp = await post(f);
        fetchGetSweat();
        setIndex(rsp.index);
        getOpenedFile();
    }

    const deleteImage = async (f) => {
        const rsp = await deleteSingleImage(f);
        fetchGetSweat();
        changeIndex(false);
        
    }

    const changeIndex = (inc) => {
        let newIndex;
        if(inc) {
            newIndex = index + 1;
        } else {
            newIndex = index - 1;
        }
        if(newIndex > fileList.length) {
            newIndex = 0;
        }else if(newIndex < 0) {
            newIndex = fileList.length;
        }
        setIndex(newIndex);
        if(index === fileList.length) {
            setIsInput(true);
        }else {
            setIsInput(false);
        }
        getOpenedFile();
    }

    //////////USE EFFECT//////////

    /**
     * useEffect hook
     * load on mount
     * fetch data for one sweat only
     */
    useEffect(() => {
        fetchGetSweat();
        if(fileList.length > 0) {
            getOpenedFile();
        }
        if(fileList.length <= 0) {setIsInput(true)}
    }, [])

    //////////RETURN COMPONENT//////////

    return(<div className={`admin-sweat-image-editor container ${className}`}>
        {!isEdit &&
            <div className="admin-sweat-image-editor image-table">
                {isInput
                    ? <FileUploader classes="admin-sweat-image-editor input-image" name="SweatImage" handleChange={(f) => postImage(f)} types={["png", "jpeg"]} />
                    : <div>
                        <FontAwesomeIcon className="admin-sweat-image-editor delete-image" icon={faCircleXmarkRegular} onClick={(e) => deleteImage(fileList[index])}/>
                        <img src={openedFile} alt={`${promo}-${color}`} className="admin-sweat-image-editor showed-image"/>
                    </div>
                }
                <div className="admin-sweat-image-editor nav-image">
                    <FontAwesomeIcon icon={faChevronCircleLeft} onClick={(e) => changeIndex(false)}/>
                    <p className="admin-sweat-image-editor position">{`${index}/${fileList.length}`}</p>
                    <FontAwesomeIcon icon={faChevronCircleRight} onClick={(e) => changeIndex(true)}/>
                </div>
            </div>
        }
        <div className="admin-sweat-image-editor">
            {isEdit
                ?editMode
                :readMode
            }
        </div>
    </div>)
}

export default AdminSweatImageEditor;