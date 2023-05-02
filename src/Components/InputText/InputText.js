import './InputText.css';

export const typeList = {
    text: "text",
    email: "email",
    tel: "tel",

}

const InputText = (props) => {
    const label = props.label;
    const type = props.type || "text";
    const onChangeCallBack = props.onChange;
    const id = props.id;
    const value = props.value || "";


    return(
        <div className={"input-text container " + id}>
            <label className={"input-text label " + id} htmlFor={id}>{label}</label>
            <input className={"input-text input " + id} type={type} placeholder={label} onInput={(e) => {onChangeCallBack(e.target.value)}}/>
        </div>

    )
}

export default InputText