import React, { useState, useEffect } from "react";
import axios from "axios";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Navbar from '../../Website/Navbar/Navbar';
import Footer from '../../Website/Footer/Footer';
import "../../Website/website.css";
import Container from '../../Website/Components/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fruits from "../../Website/assets/fruits.jpg";

axios.defaults.baseURL = "http://localhost:8070/";

const JoinWithUsStaff = () => {
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [nicError, setNicError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Salary/");
      setDataList(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

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
        console.error(error);
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

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password) || !/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
    } else {
      return "";
    }
  };

  const validateEmail = (email) => {
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return "Invalid email address. Please enter a valid email.";
    } else {
      return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && /[^\p{L}\s]/u.test(value)) {
      return;
    }
    if (name === "bankname"&& /[^\p{L}\s]/u.test(value)) {
      return;
    }
    if (name === "nic") {
      validateNic(value);
    }
    if (name === "nic" && !/^[0-9Vv]*[Vv]?[0-9Vv]*$/.test(value)) {
      return; 
  }
  
    
    if (name === "email") {
      const emailError = validateEmail(value);
      setEmailError(emailError);
    }

    if (name === "password") {
      const passwordError = validatePassword(value);
      setPasswordError(passwordError);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateNic = (nic) => {
    const nicRegex = /^(([1][89]|[2][0])\d{10}|[89]\d{8}[Vv])$/;

    if (!nicRegex.test(nic)) {
      setNicError("Invalid NIC format. Please enter a valid Sri Lankan NIC.");
    } else {
      setNicError("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const currentDate = getCurrentDate();
    const formDataWithDate = { ...formData, joineddate: currentDate };
  
    // Check if required fields are filled
    if (
      formData.name &&
      formData.jobrole &&
      formData.nic &&
      formData.address &&
      formData.email &&
      formData.password &&
      formData.accno &&
      formData.bankname &&
      nicError === "" &&
      emailError === "" &&
      passwordError === ""
    ) {
      try {
        await handleAddSubmit(formDataWithDate);
      } catch (error) {
        console.error(error);
        toast.error("Error occurred while submitting the form. Please try again later.");
      }
    } else {
      toast.error("Please fill in all required fields and correct any errors before submitting.");
    }
  };
  

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAddSubmit = async (formData) => {
    try {
      const response = await axios.post("/Unregistered/add", formData);
      toast.success("Unregistered user Added");
      getFetchData();
    } catch (err) {
      console.error(err.message);
      toast.error("Error occurred while adding Unregistered user.");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className='hero'>
              <div>
                <img src={fruits} className='background' style={{top:"-180px"}}></img>
              </div>
              <div className="container" >
                <div className="col-lg-12">
                    <div className="hero-text">
                      <p className='text1 '>Join With Us
</p>
                      <p className='text2 fs-3'>Let's spread the freshness together!</p>
                    </div>
                    
                    <div className="hero-dot-play">
                      <ul className="hero-dots">
                          
                      </ul>
                     
                    </div>
                </div>
              </div>   
            </div>
      
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row"> 
          <div className="col-md-6">
            <h3 className="contact-title mb-5 mt-5">Personal Information</h3>
            <form onSubmit={handleFormSubmit}>
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
                <label htmlFor="nic" className="form-label">
                  NIC
                </label>
                <input
                  type="text"
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
              
            </form>
          </div>
          <div className="col-md-6">
            <h3 className="contact-title mb-5 mt-5">Account Information</h3>
            <form>
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
              
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success" onClick={handleFormSubmit}>
            Submit
          </button>
        </div>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </div>
  );
};

export default JoinWithUsStaff;
