import React from 'react'

const PersonForm = ({newName, newPhone, handleChangeName, handleChangePhone, handleSubmit}) => {
  
    return (
      <form>
          <div>
            <h3>Add new entry</h3>
            <p>name: <input id='inputName' value={newName} onChange={handleChangeName}/></p>          
            <p>number: <input value={newPhone} onChange={handleChangePhone}/></p>          
          </div>
          <div>
            <button type="submit" onClick={handleSubmit} >add</button>
          </div>
      </form>
    )
  }


export default PersonForm