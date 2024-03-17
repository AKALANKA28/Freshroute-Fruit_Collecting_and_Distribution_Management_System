const FarmerForm = ({ handleSubmit, handleOnChange, rest }) => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Farmer NIC
            </label>
            <input
              type="text"
              className="form-control"
              name="NIC"
              placeholder="Farmer NIC"
              onChange={handleOnChange}
              value={rest.NIC}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              onChange={handleOnChange}
              value={rest.username}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="name"
              onChange={handleOnChange}
              value={rest.name}
            />
          </div>  

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Email"
              onChange={handleOnChange}
              value={rest.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="City"
              onChange={handleOnChange}
              value={rest.city}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Lane
            </label>
            <input
              type="text"
              className="form-control"
              name="lane"
              placeholder="Lane"
              onChange={handleOnChange}
              value={rest.lane}
            />
          </div>         

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

export default FarmerForm;