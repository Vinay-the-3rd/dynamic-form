import React, { useState } from 'react'
import AddFieldsBox from './AddFieldsBox';
import './DynamicForm.css';

const DynamicForm = () => {
  const [addFieldBox, setAddFieldBox] = useState(false);
  const [jsonData, setJsonData] = useState([]);

  const handleSubmitAddField = (label, selectFiled, options) => {
    const newEntry = { label: label, fieldType: selectFiled, option: options }
    setJsonData((prevOption) => [...prevOption, newEntry])
    setAddFieldBox(false);
  }
  console.log(jsonData)
  const handleAddFieldBox = () => {
    setAddFieldBox(!addFieldBox)
  }
  const removeFormField = (index) => {
    const updatedFormFields = [...jsonData];
    updatedFormFields.splice(index, 1);
    setJsonData(updatedFormFields);
  };
  const handleSaveJson = () => {
    console.log('it')
    function download(content, fileName, contentType) {
      const a = document.createElement("a");
      const file = new Blob([content], { type: contentType });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    }
    download(JSON.stringify(jsonData), "yourfile.json", "text/plain");
  };

  // Load form configuration from JSON 
  const loadFormConfig = (jsonConfig) => {
    const reader = new FileReader();
    if (!jsonConfig) {
      return null;
    }
    reader.onload = (e) => {
      try {
        const uploadJsonData = JSON.parse(e.target.result);
        setJsonData(uploadJsonData);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(jsonConfig)
  };
  return (
    <div className='container'>
      {addFieldBox && <AddFieldsBox handleSubmitAddField={handleSubmitAddField} setAddFieldBox={setAddFieldBox} />}
      <h2>Dynamic form generator</h2>
      {jsonData.length !== 0 && jsonData.map((data, index) => (
        <div key={index}>
          {data.fieldType === 'textinput' &&
            <div className='option-box'>
              <div>
                <label className='option-label'>{data.label}</label>
                <input className='option-text' type='text' />
              </div>
              <button className='removebtn' onClick={() => removeFormField(index)}> Remove </button>
            </div>
          }
          {data.fieldType === 'textarea' &&
            <div className='option-box' >
              <div>
                <label className='option-label' >{data.label}</label>
                <textarea />
              </div>
              <button className='removebtn' onClick={() => removeFormField(index)}> Remove </button>
            </div>
          }
          {data.fieldType === 'dropdown' &&
            <div className='option-box'>
              <div>
                <label className='option-label' >{data.label}</label>
                <select>
                  {data.option.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <button className='removebtn' onClick={() => removeFormField(index)}> Remove </button>
            </div>
          }
          {data.fieldType === 'checkbox' &&
            <div className='option-box'>
              <div>
                <input type='checkbox' />
                <label className='option-label' >{data.label}</label>
              </div>
              <button className='removebtn' onClick={() => removeFormField(index)}> Remove </button>
            </div>
          }
          {data.fieldType === 'radioButton' &&
            <div className='option-box'>
              <div>
                <input type='radio' />
                <label className='option-label' >{data.label}</label>
              </div>
              <button className='removebtn' onClick={() => removeFormField(index)}> Remove </button>
            </div>
          }
        </div>
      ))}
      <div style={{ display: 'flex', marginTop: '25px' }}>
        <button className="btn" style={{ marginLeft: '40%' }} onClick={handleAddFieldBox}>Add fields</button>
        {jsonData.length !== 0 &&
          <button className="btn" onClick={() => handleSaveJson()}>Save</button>
        }
        <div style={{marginTop: '10px'}}>
          <input className="file-input" type="file" id="fileInput" onChange={(e) => loadFormConfig(e.target.files[0])} />
          <label htmlFor="fileInput" className="custom-file-input">
            Choose a file
          </label>
        </div>

      </div>
    </div>
  )
}

export default DynamicForm