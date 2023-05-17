import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { useUrlImageListGET } from '../../routes/sweatRoutes';
import './SlideImage.css';

const SlideImage = (props) => {
    const filenames = props.filenames;
    const getImages = useUrlImageListGET();
    const [ urlMap, setUrlMap ] = useState(new Map());
    const [ openedURL, setOpenedURL ] = useState('');
    const [ openedAlt, setOpenedAlt ] = useState('');
    const [ index, setIndex ] = useState(0);

    const changeIndex = (inc) => {
        let newIndex;
        if(inc) {
            newIndex = index + 1;
        } else {
            newIndex = index - 1;
        }
        if(newIndex >= filenames.length) {
            newIndex = 0;
        }else if(newIndex < 0) {
            newIndex = filenames.length - 1;
        }
        setIndex(newIndex);
    }

    useEffect(() => {
        console.log('filenames : ', filenames);
        setUrlMap(map => new Map(map.clear()))
        filenames.forEach(async filename => {
            const url = await getImages(filename);
            setUrlMap(map => new Map([...map, [filename, url]]))
        })
        setIndex(0);
    }, [filenames])

    useEffect(() => {
        setOpenedAlt(filenames[index]);
        setOpenedURL(urlMap.get(filenames[index]));
    }, [index, urlMap])

    return(
        <div className="slide-image container">
            <div>
                <img src={openedURL} alt={openedAlt} className="slide-image showed-image"/>
            </div>
            <div className="slide-image nav-image">
                <FontAwesomeIcon icon={faChevronCircleLeft} onClick={(e) => 
                    {return changeIndex(false)}
                    }/>
                <p className="slide-image position">{`${index + 1}/${filenames.length}`}</p>
                <FontAwesomeIcon icon={faChevronCircleRight} onClick={(e) => 
                    {return changeIndex(true)}
                    }/>
            </div>
        </div>
    )
}

export default SlideImage;