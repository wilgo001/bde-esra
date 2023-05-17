import { setUserEmail } from '../../app/userSlice';
import './InputSelect.css';
import { useEffect, useState } from 'react';

const TYPES = {
    text: 'text',
    color: 'color',
}

const InputSelect = (props) => {
    const id = props.id;
    const label = props.label;
    const options = props.options;
    const [ selectedOption, setSelectedOption ] = useState(props.selectedOption);
    const onChangeCallBack = props.onChange;
    const type = props.type || 'text';

    useEffect(() => {
        setSelectedOption(options[0]);
    }, [options])

    useEffect(() => {
        onChangeCallBack(selectedOption);
    }, [selectedOption])

    return(
        <div className={"input-radio container " + id}>
            <label className={"input-radio label " + id}>{label}</label>
            <div className={"input-radio options " + id}>
                {options?.map((option) => {
                    let optionLabel = '';
                    let optionColor = '';
                    switch(type) {
                        case TYPES.text :
                            optionLabel = option;
                            break;
                        case TYPES.color :
                            optionLabel = option.name;
                            optionColor = option.hex;
                    }
                    const specID = props.id + "-" + optionLabel;
                    return(
                        <div className={"input-radio option-container " + specID} key={specID}>
                            <label htmlFor={specID} className={"input-radio option-label " + specID}>{optionLabel}</label>
                            <input type="radio" value={optionLabel} name={id} checked={selectedOption === option} className="input-radio option-btn" id={specID} onChange={(e) => {setSelectedOption(e.target.value)}}/>
                            
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default InputSelect;