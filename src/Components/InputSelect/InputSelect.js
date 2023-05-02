import './InputSelect.css';
import { useEffect, useState } from 'react';

const InputSelect = (props) => {
    const id = props.id;
    const label = props.label;
    const options = props.options;
    const selectedOption = props.selected || options[0];
    const onChangeCallBack = props.onChange;

    return(
        <div className={"input-radio container " + id}>
            <label className={"input-radio label " + id}>{label}</label>
            <div className={"input-radio options " + id}>
                {options.map((option) => {
                    const specID = props.id + "-" + option;
                    return(
                        <div className={"input-radio option-container " + specID} key={specID}>
                            <label htmlFor={specID} className={"input-radio option-label " + specID}>{option}</label>
                            <input type="radio" value={option} checked={option===selectedOption} name={id} className="input-radio option-btn" id={specID} onChange={(e) => {onChangeCallBack(e.target.value)}}/>
                            
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default InputSelect;