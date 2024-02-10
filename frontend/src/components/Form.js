import React from 'react'
import "../App.css"


const Form = ({handleSubmit, handleOnChange,rest}) => {
  return (
    <div>
     <form onSubmit ={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">name</label>
                 <input type="text" className="form-control"  name="name" placeholder="name" onChange={handleOnChange} value={rest.name}/>
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">age</label>
                <input type="text" className="form-control" name="age" placeholder="age" onChange={handleOnChange} value={rest.age}/>
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">gender</label>
                <input type="text" className="form-control"  name="gender" placeholder="gender" onChange={handleOnChange} value={rest.gender}/>
              </div>
              <button type="submit">Submit</button>
          </form>
    </div>
  )
}

export default Form



