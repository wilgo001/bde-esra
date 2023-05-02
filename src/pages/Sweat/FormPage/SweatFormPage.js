import { useState, useEffect } from "react";
import SweatOrderPage from "./SweatOrderPage/SweatOrderPage";
import SweatUserPage from "./SweatUserPage/SweatUserPage";
import "./SweatFormPage.css";

const SweatFormPage = () => {
    const [pageNbr, setPageNbr] = useState(0);
    const [pageShowed, setPageShowed] = useState(<SweatUserPage/>);
    useEffect(() => {
      switch(pageNbr) {
        case 0:
            setPageShowed(<SweatUserPage/>);
            break;
        case 1:
            setPageShowed(<SweatOrderPage/>);
            break;
        default:
            break;
      }
    }, [pageNbr])
    
    return(
        <div className="form container">
            <div className="form sub-page-container">
                {pageShowed}
            </div>
            <div className="form btn-container">
                <button title="previous page" onClick={(e)=> {setPageNbr(pageNbr-1)}} className="form btn">previous page</button>
                <button title="next page" onClick={(e)=> {setPageNbr(pageNbr+1)}} className="form btn">next page</button>
            </div>
        </div>
    )
}

export default SweatFormPage;