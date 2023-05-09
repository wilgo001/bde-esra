import { faChevronCircleLeft, faChevronCircleRight, faCircleXmark as faCircleXmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark as faCircleXmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { useAdminSweatImageGET, useAdminSweatImagePOST, useAdminSweatImageDELETE, useAdminSweatFileNamesGET } from "../../../../routes/adminConnexionRoutes";

const AdminSweatImageViewer = (props) => {
    /////PROPS CONSTANT/////
    const promo = props.promo;
    const color = props.color;
    const [fileList, setFileList ] = useState([]);
    const id = props.id;
    /////fetch hook/////
    const post = useAdminSweatImagePOST(id);
    const deleteSingleImage = useAdminSweatImageDELETE(id);
    const getSweatImage = useAdminSweatImageGET(id);
    const getFileNames = useAdminSweatFileNamesGET(id);
    /////STATES/////
    const [index, setIndex] = useState(0);
    const [ urlMap, setUrlMap ] = useState(new Map());
    const [ openedFile, setOpenedFile ] = useState('input');
    const [ isInput, setIsInput ] = useState(false);

    const updateFiles = async () => {
        const fileNames = await getFileNames();
        setFileList(fileNames);
    }
    
    const fetchData = () => {
        setUrlMap(map => new Map(map.clear()));
        fileList.forEach(async filename => {
            const url = await getSweatImage(filename);
            setUrlMap(map => new Map([...map, [filename, url]]));
        })
    };

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
        if(newIndex === fileList.length) {
            setIsInput(true);
        }else {
            setIsInput(false);
        }
    }

    useEffect(() => {
        updateFiles();
    }, []);

    useEffect(() => {
        fetchData();
    }, [fileList]);

    useEffect(() => {

        if(fileList.length > index) {
            setIsInput(false);
            setOpenedFile(urlMap.get(fileList[index]));
        }
    }, [urlMap, index]);
        /**
     * postImage
     * @param {File} f the image to be sent to server
     * send image to post request
     * update index to response index
     * open the new image
     */
        const postImage = async (f) => {
            const rsp = await post(f);
            await updateFiles();
            setIndex(rsp.index);
        }
    
        const deleteImage = async (f) => {
            await deleteSingleImage(f);
            await updateFiles();
            setIndex(0);
        }

    return(
        <div className="admin-sweat-image-editor image-table">
            {isInput
                ? <FileUploader classes="admin-sweat-image-editor input-image" name="SweatImage" handleChange={(f) => postImage(f)} types={["png", "jpeg"]} />
                : <div>
                    <FontAwesomeIcon className="admin-sweat-image-editor delete-image" icon={faCircleXmarkRegular} onClick={(e) => deleteImage(fileList[index])}/>
                    <img src={openedFile} alt={promo+" "+ color.name} className="admin-sweat-image-editor showed-image"/>
                </div>
            }
            <div className="admin-sweat-image-editor nav-image">
                <FontAwesomeIcon icon={faChevronCircleLeft} onClick={(e) => 
                    {return changeIndex(false)}
                    }/>
                <p className="admin-sweat-image-editor position">{`${index + 1}/${fileList.length + 1}`}</p>
                <FontAwesomeIcon icon={faChevronCircleRight} onClick={(e) => 
                    {return changeIndex(true)}
                    }/>
            </div>
        </div>
    )
}

export default AdminSweatImageViewer;