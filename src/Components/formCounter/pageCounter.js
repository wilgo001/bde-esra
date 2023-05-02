import "./pageCounter.css";

const pageCounter = (props) => {
    const pageList = props.pages;
    const callbackSelectPage = props.onSelect;
    const pageSelector = props.selector;
    const globalClassName = "page-counter ";

    return(
        <div className={globalClassName + "container"}>
            {pageList.map((page, index) => {
                return(
                    <div key={page} className={globalClassName + "page-container"}>                  
                        <label className={globalClassName + "page-label"}>{index+1}</label>
                        <div className={globalClassName + "page-line"}/>
                    </div>
                )
            })}
        </div>
    )
}

export default formCounter;