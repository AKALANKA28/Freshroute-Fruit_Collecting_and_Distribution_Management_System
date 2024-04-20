import React, { useState, useEffect } from "react";
import storage from "../../src/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const JoinWithUsForm = ({ handleSubmit, initialData }) => {
  const [landDeed, setLandDeed] = useState(undefined);
  const [landDeedPerc, setLandDeedPerc] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    NIC: "",
    landAddress: "",
    fieldArea: "",
  });

  // useEffect(() => {
  //   landDeed && uploadFile(landDeed, "landDeedUrl");
  // }, [landDeed]);

  // const uploadFile = (file, fileType) => {
  //   const fileName = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, 'files/landDeeds/' + fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setLandDeedPerc(Math.round(progress));
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log('DownloadURL - ', downloadURL);
  //         setFormData((prev) => ({
  //           ...prev,
  //           [fileType]: downloadURL
  //         }));
  //       });
  //     }
  //   );
  // };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // useEffect(() => {
  //   const getCurrentDate = () => {
  //     const now = new Date();
  //     const year = now.getFullYear();
  //     const month = String(now.getMonth() + 1).padStart(2, '0');
  //     const day = String(now.getDate()).padStart(2, '0');
  //     return `${year}-${month}-${day}`;
  //   };

  //   setFormData(prevState => ({
  //     ...prevState,
  //     date: getCurrentDate()
  //   }));
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="mobile" className="form-label">
          Mobile
        </label>
        <input
          type="text"
          className="form-control"
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          value={formData.mobile}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          name="city"
          placeholder="City"
          onChange={handleChange}
          value={formData.city}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="NIC" className="form-label">
          NIC
        </label>
        <input
          type="text"
          className="form-control"
          name="NIC"
          placeholder="NIC"
          onChange={handleChange}
          value={formData.NIC}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="landAddress" className="form-label">
          Land Address
        </label>
        <input
          type="text"
          className="form-control"
          name="landAddress"
          placeholder="Land Address"
          onChange={handleChange}
          value={formData.landAddress}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="fieldArea" className="form-label">
          Field Area
        </label>
        <input
          type="text"
          className="form-control"
          name="fieldArea" // Ensure consistency with the server-side schema
          placeholder="Field Area"
          onChange={handleChange}
          value={formData.fieldArea}
          required
        />
      </div>

      

      {/* <div className="mb-3">
        <label htmlFor="landDeedUrl" className="form-label">{landDeedPerc > 0 && "Uploading: "+ landDeedPerc+ "%"}
          Image
        </label>
        <input
         type="file"
          className="form-control"
          name="imageUrl"
         onChange={(e) => setLandDeed(e.target.files[0])}
/>
      </div> */}
      
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default JoinWithUsForm;