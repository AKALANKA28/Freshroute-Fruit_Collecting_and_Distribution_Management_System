import React, { useState, useEffect } from "react";
import axios from "axios";
import storage from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

axios.defaults.baseURL = "http://localhost:8070/";

const EmployeeForm = ({ handleSubmit, initialData }) => {
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [nicError, setNicError] = useState("");

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Salary/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    jobrole: "",
    nic: "",
    address: "",
    email: "",
    accno: "",
    bankname: "",
    qualifications: "",
    joineddate: "",
    imageUrl: "",
    fileUrl: "",
  });

  useEffect(() => {
    img && uploadFile(img, "imageUrl");
  }, [img]);

  useEffect(() => {
    file && uploadFile(file, "fileUrl");
  }, [file]);

  const uploadFile = (file, fileType) => {
    const fileName = new Date().getTime() + file.name;
    const folder = fileType === "imageUrl" ? "images/profilePics/" : "files/qualifications/";
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fileType === "imageUrl"
          ? setImgPerc(Math.round(progress))
          : setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('DownloadURL - ', downloadURL);
          setFormData((prev) => ({
            ...prev,
            [fileType]: downloadURL
          }));
        });
      }
    );
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && /\d/.test(value)){
      return;
    
    }
    if (name === "bankname" && /\d/.test(value)){
      return;
    
    }
    if (name === "nic") {
      validateNic(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateNic = (nic) => {
    const nicRegex = /^(?:\d{9}[vV]|\d{12})$/;
    
    if (!nicRegex.test(nic)) {
      setNicError("Invalid NIC format. Please enter a valid Sri Lankan NIC.");
    } else {
      setNicError("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (nicError === "") {
      handleSubmit(formData);
    } else {
      alert("Please correct the NIC error before submitting.");
    }
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    setFormData((prevState) => ({
      ...prevState,
      joineddate: getCurrentDate(),
    }));
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="row">
        <div className="col-md-6">
          {/* Left section of the form */}
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              {imgPerc > 0 && "Uploading: " + imgPerc + "%"}
              Image
            </label>
            <input
              type="file"
              className="form-control"
              name="imageUrl"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Employee Name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jobrole" className="form-label">
              Job role
            </label>
            <select
              className="form-select"
              name="jobrole"
              onChange={handleChange}
              value={formData.jobrole}
              required
            >
              <option value="">Select Job Role</option>
              {dataList.length ? (
                dataList.map((emp, index) => (
                  <option key={index} value={emp.jobrole}>
                    {emp.jobrole}
                  </option>
                ))
              ) : (
                <option value="">No Job Roles</option>
              )}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="nic" className="form-label">
              NIC
            </label>
            <input
              type=""
              className="form-control"
              name="nic"
              placeholder="NIC"
              onChange={handleChange}
              value={formData.nic}
              required
              maxLength={12}
            />
            {nicError && <p className="text-danger">{nicError}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              value={formData.address}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          {/* Right section of the form */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="accno" className="form-label">
              Account Number
            </label>
            <input
              type="number"
              className="form-control"
              name="accno"
              placeholder="Account Number"
              onChange={handleChange}
              value={formData.accno}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bankname" className="form-label">
              Bank Name
            </label>
            <input
              type="text"
              className="form-control"
              name="bankname"
              placeholder="Bank Name"
              onChange={handleChange}
              value={formData.bankname}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fileUrl" className="form-label">
              {filePerc > 0 && "Uploading: " + filePerc + "%"}
              Qualifications
            </label>
            <input
              type="file"
              className="form-control"
              name="fileUrl"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="joineddate" className="form-label">
              Joined Date
            </label>
            <input
              type="date"
              className="form-control"
              name="joineddate"
              placeholder="Joined Date"
              onChange={handleChange}
              value={formData.joineddate}
              required
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
