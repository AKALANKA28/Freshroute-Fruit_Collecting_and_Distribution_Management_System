import React, { useState, useEffect } from "react";
import axios from "axios";
import storage from "../../../../firebase"; // Import Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import Firebase storage functions

axios.defaults.baseURL = "http://localhost:8070/"; // Set default base URL for Axios requests

const EmployeeForm = ({ handleSubmit, initialData }) => {
  // State variables using React Hooks
  const [img, setImg] = useState(undefined); // State for image file
  const [imgPerc, setImgPerc] = useState(0); // State for image upload progress percentage
  const [file, setFile] = useState(undefined); // State for file
  const [filePerc, setFilePerc] = useState(0); // State for file upload progress percentage
  const [dataList, setDataList] = useState([]); // State for data list from server
  const [nicError, setNicError] = useState(""); // State for NIC validation error
  const [passwordError, setPasswordError] = useState(""); // State for password validation error
  const [emailError, setEmailError] = useState(""); // State for email validation error
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Function to toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Fetch data from server when component mounts
  useEffect(() => {
    getFetchData();
  }, []);

  // Function to fetch data from server
  const getFetchData = async () => {
    try {
      const response = await axios.get("/Salary/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    jobrole: "",
    nic: "",
    address: "",
    email: "",
    password: "",
    accno: "",
    bankname: "",
    qualifications: "",
    joineddate: "",
    imageUrl: "",
    fileUrl: "",
  });

  // Upload image when 'img' state changes
  useEffect(() => {
    img && uploadFile(img, "imageUrl");
  }, [img]);

  // Upload file when 'file' state changes
  useEffect(() => {
    file && uploadFile(file, "fileUrl");
  }, [file]);

  // Function to upload file to Firebase storage
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
          setFormData((prev) => ({
            ...prev,
            [fileType]: downloadURL
          }));
        });
      }
    );
  };

  // Update form data when initial data changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Function to validate password
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password) || !/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
    } else {
      return ""; // No error
    }
  };

  // Function to validate email
  const validateEmail = (email) => {
    if (!/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/.test(email)) {
      return "Invalid email address. Please enter a valid email.";
    } else {
      return ""; // No error
    }
  };
  

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name validation
  if (name === "name" && /[^a-zA-Z\s]/.test(value)) {
    return;
  }
    if (name === "bankname" && /\d/.test(value)) {
      return;
    }
    if (name === "nic") {
      validateNic(value);
    }
    if (name === "nic" && /[^0-9Vv]/.test(value)) {
      return;
    }
    if (name === "email" && /[^a-zA-Z0-9\s@.]/.test(value)) {
      return; 
    }
    // Address validation
if (name === "address" && /[^a-zA-Z0-9\s/]/.test(value)) {
  return;
}


    // Email validation
    if (name === "email") {
      const emailError = validateEmail(value);
      setEmailError(emailError);
    }

    // Password validation
    if (name === "password") {
      const passwordError = validatePassword(value);
      setPasswordError(passwordError);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to validate NIC
  const validateNic = (nic) => {
    const nicRegex = /^(([1][89]|[2][0])\d{10}|[3456789]\d{8}[Vv])$/;

    if (!nicRegex.test(nic)) {
      setNicError("Invalid NIC format. Please enter a valid Sri Lankan NIC.");
    } else {
      setNicError("");
    }
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const currentDate = getCurrentDate();
    const formDataWithDate = { ...formData, joineddate: currentDate };

    if (nicError === "") {
      handleSubmit(formDataWithDate);
    } else {
      alert("Please correct the NIC error before submitting.");
    }
  };

  // Function to get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Set initial joined date on component mount
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
              className="form-control"
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
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {passwordError && <p className="text-danger">{passwordError}</p>}
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
