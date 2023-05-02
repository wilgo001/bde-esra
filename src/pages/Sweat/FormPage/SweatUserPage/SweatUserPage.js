import { setUserClass, setUserEmail, setUserFirstName, setUserLastName, setUserPhone, setUserYear } from '../../../../app/userSlice';
import { InputSelect, InputText, typeList } from '../../../../Components';
import './SweatUserPage.css';
import { useDispatch } from 'react-redux';

const SweatUserPage = () => {
    const dispatch = useDispatch();
    return(
        <div className='user container'>
            <InputText label="prénom" id="UserFirstName" type={typeList.text} onChange={(e) => {dispatch(setUserFirstName(e.target.value))}}/>
            <InputText label="nom" id="UserFirstName" type={typeList.text} onChange={(e) => {dispatch(setUserLastName(e.target.value))}}/>
            <InputText label="email" id="UserEmail" type={typeList.email} onChange={(e) => {dispatch(setUserEmail(e.target.value))}}/>
            <InputText label="tel" id="UserTel" type={typeList.tel} onChange={(e) => {dispatch(setUserPhone(e.target.value))}}/>
            <InputSelect label="formation" id="UserClass" options={["ESRA", "ISTS", "Animation"]} onChange={(value)=>{dispatch(setUserClass(value))}}/>
            <InputSelect label="année" id="UserYear" options={["1ère", "2ème", "3ème"]}  onChange={(value)=>{dispatch(setUserYear(value))}}/>
        </div>
    )
}

export default SweatUserPage;