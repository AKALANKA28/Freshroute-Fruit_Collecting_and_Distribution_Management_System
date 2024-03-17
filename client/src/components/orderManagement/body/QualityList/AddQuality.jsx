//C:\Users\HP\Documents\GitHub\MERN_Project\client\src\components\orderManagement\body\QualityList\AddQuality.jsx

const AddQuality = ({ handleSubmit, handleOnChange, rest }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Fruit category
          </label>
          <input
            type="text"
            className="form-control"
            name="FrCat"
            placeholder="Fruit Category"
            required
            onChange={handleOnChange}
            value={rest.NIC}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Grade
          </label>
          <input
            type="text"
            className="form-control"
            name="qgrade"
            placeholder="Grade"
            required
            onChange={handleOnChange}
            value={rest.username}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Quality Description
          </label>
          <input
            type="text"
            className="form-control"
            name="qdescription"
            placeholder="Description"
            required
            onChange={handleOnChange}
            value={rest.name}
          />
        </div> 

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Storage Conditions 
          </label>
          <input
            type="text"
            className="form-control"
            name="conditions"
            placeholder="Storage Conditions"
            required
            onChange={handleOnChange}
            value={rest.name}
          />
        </div> 

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddQuality;