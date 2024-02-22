import React, { useState } from 'react'
import './AddFieldsBox.css'

const AddFieldsBox = ({ handleSubmitAddField, setAddFieldBox }) => {
    const [selectFiled, setSelectFiled] = useState('');
    const [selectFiledId, setSelectFiledId] = useState('');
    const [label, setlabel] = useState('');
    const [text, setText] = useState('');
    const [options, setOptions] = useState([]);

    const handleSelectFiled = (type, id) => {
        setSelectFiled(type);
        setSelectFiledId(id);
    }

    const handleAddOption = () => {
        setOptions(prevOption => [...prevOption, text])
        setText('')
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const fieldType = [
        {
            id: '1',
            text: 'Text input',
            type: 'textinput'
        },
        {
            id: '2',
            text: 'Text area',
            type: 'textarea'
        },
        {
            id: '3',
            text: 'Dropdown',
            type: 'dropdown'
        },
        {
            id: '4',
            text: 'Checkbox',
            type: 'checkbox'
        },
        {
            id: '5',
            text: 'Radio button',
            type: 'radioButton'
        }
    ]
    return (
        <div className='fields-container' >
            <div className='fields-box'>
                <div>
                    <label className='label'>Enter the lable</label>
                    <input className='input-text' type='text' onChange={(e) => setlabel(e.target.value)} />
                </div>
                <div className='field-type'>
                    <label className='label'>Select field type:</label>
                    {fieldType.map((field) => (
                        <button className={field.id===selectFiledId ? 'onclickfield-btn' : 'field-btn'} key={field.id} onClick={() => handleSelectFiled(field.type, field.id)}>{field.text}</button>
                    ))}
                </div>
                {selectFiled === 'dropdown' &&
                    <div>
                        <h3 style={{margin:'10px'}}> Please input the option</h3>
                        <input type='text' className='input-option' value={text} onChange={(e) => handleChange(e)} />
                        <button className='field-btn' onClick={() => handleAddOption()} >Add Option</button>
                        <div style={{display:'flex', margin:'10px 20% 0% 20%'}}>
                        {options.length !== 0 && options.map((option) => (
                            <h4 style={{marginRight:'8px'}}>{option}</h4>
                        ))}
                        </div>
                    </div>}
                <div className='btnBox'>
                    <button className='cancelbtn' onClick={() => setAddFieldBox(false)} >Cancel</button>
                    <button className='savebtn' onClick={() => handleSubmitAddField(label, selectFiled, options)}>submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddFieldsBox