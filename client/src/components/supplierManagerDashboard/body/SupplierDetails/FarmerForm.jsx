// import React, { useState, useEffect } from "react";

// const FarmerForm = ({ handleSubmit, initialData }) => {
//   const [formData, setFormData] = useState({
//     NIC: "",
//     username: "",
//     name: "",
//     email: "",
//     city: "",
//     lane: "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <div className="mb-3">
//         <label htmlFor="jobrole" className="form-label">
//           Farmer NIC
//         </label>
//              <input
//             type="text"
//             className="form-control"
//             name="NIC"
//             placeholder="Farmer NIC"
//             id = "NIC"
//             required
//             onChange={handleChange}
//             value={formData.NIC}
//         />
//       </div>
      
//       <div className="mb-3">
//            <label htmlFor="date" className="form-label">
//              Username
//            </label>
//            <input
//             type="text"
//             className="form-control"
//             name="username"
//             placeholder="Username"
//             required
//             onChange={handleChange}
//             value={formData.username}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="date" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="name"
//             placeholder="name"
//             required
//             onChange={handleChange}
//             value={formData.name}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="date" className="form-label">
//             Email
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="email"
//             placeholder="Email"
//             required
//             onChange={handleChange}
//             value={formData.email}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">
//             City
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="city"
//             placeholder="City"
//             required
//             onChange={handleChange}
//             value={formData.city}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">
//             Lane
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="lane"
//             placeholder="Lane"
//             required
//             onChange={handleChange}
//             value={formData.lane}
//           />
//         </div>

//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default FarmerForm;


import React, { useState, useEffect } from "react";

const FarmerForm = ({ handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    NIC: "",
    username: "",
    name: "",
    email: "",
    city: "",
    lane: "",
  });

  const [formErrors, setFormErrors] = useState({
    NIC: "",
    username: "",
    name: "",
    email: "",
    city: "",
    lane: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Validate input on change
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "NIC":
        error = value.trim().length === 0 ? "NIC is required" : "";
        break;
      case "username":
        error = value.trim().length === 0 ? "Username is required" : "";
        break;
      case "name":
        error = value.trim().length === 0 ? "Name is required" : "";
        break;
      case "email":
        error = !value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
          ? "Invalid email address"
          : "";
        break;
      case "city":
        error = value.trim().length === 0 ? "City is required" : "";
        break;
      case "lane":
        error = value.trim().length === 0 ? "Lane is required" : "";
        break;
      default:
        break;
    }
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Check if there are any errors before submitting
    if (Object.values(formErrors).every((error) => error === "")) {
      handleSubmit(formData);
    } else {
      alert("Please fill out the form correctly");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="NIC" className="form-label">
          Farmer NIC
        </label>
        <input
          type="text"
          className={`form-control ${formErrors.NIC && "is-invalid"}`}
          name="NIC"
          placeholder="Enter NIC"
          id="NIC"
          required
          onChange={handleChange}
          value={formData.NIC}
        />
        {formErrors.NIC && <div className="invalid-feedback">{formErrors.NIC}</div>}
      </div>
      
      <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Username
            </label>
            <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter Username"
            required
            onChange={handleChange}
            value={formData.username}
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
            placeholder="Enter Name"
            required
            onChange={handleChange}
            value={formData.name}
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
            placeholder="example@domain.com"
            required
            onChange={handleChange}
            value={formData.email}
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
            placeholder="Enter City"
            required
            onChange={handleChange}
            value={formData.city}
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
            placeholder="Enter Lane"
            required
            onChange={handleChange}
            value={formData.lane}
          />
        </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FarmerForm;
