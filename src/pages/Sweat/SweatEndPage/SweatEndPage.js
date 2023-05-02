import { useSelector } from "react-redux";

const SweatEndPage = (props) => {
    const user = useSelector((state) => state.user);
    
    return(
    <div>
        {user.map((item) => <p key={item}>{item}</p>)}
    </div>
    )
}

export default SweatEndPage;