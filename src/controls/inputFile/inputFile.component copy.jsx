//****Librarys ****//
import React, { useEffect, useState,useContext } from 'react';
import { FontIcon, Label, TeachingBubble } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';

//*****Componnents*****//
import { useMemo } from 'react';
//**Methods**//

const InputFileForm = (props) => {

    /************************
     * @arguments 
     ************************/
    const [stateType, setStateType] = useState(true)
    const [stateKey, setStateKey] = useState(false)
    const [currentLayout, setCurrentLayout] = useState('default')
    const [valueInput, setValueInput] = useState('')
    const buttonId = useId('targetButton');
    const [textOnPages, setTextOnPages] = useState({})
    const [controlsPage, setControlsPage] = useState({});
    const [txtValue, setTxtValue] = useState('')
    const [classLabel, setClassLabel] = useState('')
    const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
    const [count, setCount] = useState(0)
    const [score, setScore] = useState(1)
    const [messageError, setMessageError] = useState(false)
    const [entenD, setEntenD] = useState('')
    const [entenA, setEntenA] = useState('')
    const [entenB, setEntenB] = useState('')
    const [bot, setBot] = useState(Boolean)

    /************************
     * @methods 
     ************************/
    
    /************************
     * @hooks 
     ************************/
    

    /************************
     * @resturns 
     ************************/
    return (
        <div className={`inputFile--container ${props.style}`}>
            {/* {props.label ? <label>{props.label}</label> : undefined} */}
            <div className="est btm-mrg">
            {/* {props.label ? <div className={`content ${classLabel}`}><label>{props.label}</label></div> : undefined} */}
            {props.label ? <Label>{props.label ? <div style={{position: "relative"}}> <span>{props.label}</span>{props.isRequired || props.required ? <FontIcon aria-label="requerido" iconName="SkypeCircleCheck" /> : ''} </div> : ""}</Label> : undefined}
            </div>
            {props.type != 'password' ?
                <input
                    name={props.name}
                    type={props.type}
                    className={props.className}
                    autoComplete="off"
                    defaultValue={valueInput}
                    placeholder={props.placeholder}
                    disabled={props.disable ? true : false}
                    readOnly={props.keyboard ? true : undefined}
                    onChange={(e) =>{ props.onChange(props.keyboard ? valueInput : e.target.value);}}
                />
                 : 
                <div className="inputFielt--container-input">
                    <input          
                        name={props.name}
                        autoComplete="off"
                        defaultValue={valueInput}
                        placeholder={props.placeholder}
                        type={stateType ? 'password' : 'text'}
                        disabled={props.disable ? true : false}
                        readOnly={props.keyboard ? true : undefined}
                        onClick={() => stateKey ? setStateKey(false) : setStateKey(true) }
                        onChange={(e) =>{props.onChange(props.keyboard ? valueInput : e.target.value);}}
                        maxLength={props.maxLength}
                        minLength={props.minLength}
                    /> 
                    
                    <span 
                    onClick={() => { stateType ? setStateType(false) : setStateType(true) }}                        
                    ><FontIcon aria-label="ChevronLeftSmall"
                      iconName={stateType ? 'RedEye': 'VisuallyImpaired'} 
                    />
                    </span>
                </div>
            }
                  {messageError && props.msgError?
                    <div className='message-error'>
                        <p className='paragraf-error'>{props.msgError}</p>
                    </div>
                    :''}
        </div>
    );
}

export default InputFileForm;