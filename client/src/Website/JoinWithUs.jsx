import React, { useState } from "react";
import axios from "axios";
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import storage from "../../src/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import cityCoordinates from "../components/supplierManagerDashboard/body/SupplierDetails/cityCoordinates.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fruits from "../Website/assets/fruits2.jpg";

import "./website.css";
import Container from './Components/Container';

axios.defaults.baseURL = "http://localhost:8070/";

const JoinWithUs = () => {
  const [landDeed, setLandDeed] = useState(undefined);
  const [landDeedPerc, setLandDeedPerc] = useState(0);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    latitude: "",
    longitude: "",
    NIC: '',
    landAddress: '',
    fieldArea: '',
    landDeedUrl: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    NIC: '',
    landAddress: '',
    fieldArea: '',
    landDeedUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
  
    if (name === "NIC") {
      // Show NIC type based on the first two digits
      let nicType = '';
      if (value.length >= 1) {
        const firstTwoDigits = value.substring(0, 2);
        nicType = firstTwoDigits === "20" ? "New NIC" : /^[1-9]\d/.test(firstTwoDigits) ? "Old NIC" : "";
      }
        
      // Remove special characters from NIC
      newValue = newValue.replace(/[^\dVvXx]/g, ""); // Allow only digits, v, V, x, X
        
      // Restrict the number of digits based on NIC type
      if (nicType === "Old NIC" && newValue.length > 10) {
        newValue = newValue.slice(0, 10);
      } else if (nicType === "New NIC" && newValue.length > 12) {
        newValue = newValue.slice(0, 12);
      }
  
      // Allow only one instance of v, V, x, or X
      const allowedChars = ['v', 'V', 'x', 'X'];
      const charCount = newValue.split('').filter(char => allowedChars.includes(char)).length;
      if (charCount > 1) {
        newValue = newValue.substring(0, newValue.lastIndexOf(newValue.charAt(newValue.length - 1)));
      }
  
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
        nicType: nicType
      }));
    } else if (name === "name" || name === "city") {
      // Remove space as the first character
      newValue = value.replace(/^\s+/, '');
      // Allow only letters and spaces
      newValue = newValue.replace(/[^a-zA-Z\s]/g, "");
        
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    } else if (name === "email") {
      // Remove uppercase letters
      newValue = newValue.toLowerCase();
      // Don't allow @ as the first character
      if (newValue.startsWith("@") || newValue.includes(" ")) {
        return;
      }
      // Allow only @ as a special character
      if (newValue.split("@").length > 2) {
        return; // Prevent more than one @ symbol
      }
      newValue = newValue.replace(/[^a-z0-9@.]/g, '');
      // Remove leading space
      newValue = newValue.replace(/^\s+/, '');
  
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    } else if (name === "mobile") {
      // Allow only numbers and ensure the first digit is 0
      newValue = newValue.replace(/[^\d]/g, '');
      if (!newValue.startsWith("0")) {
        newValue = newValue.substring(1); // Remove first character if it's not 0
      }
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    }
    else if (name === "fieldArea") {
      // Allow numbers and one decimal point
      newValue = newValue.replace(/[^0-9.]/g, '');
      // Allow only one decimal point
      const decimalCount = newValue.split('.').length - 1;
      if (decimalCount > 1) {
        newValue = newValue.substring(0, newValue.lastIndexOf('.'));
      }
      
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue
      }));
    }
    
    validateField(name, newValue);
    
    // If city is changed, fetch coordinates
    if (name === "city") {
      fetchCoordinates(value);
    }
  };
  
  
  
  const handleCityChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      city: value,
    }));
    setShowSuggestions(true);
    const filteredSuggestions = cityCoordinates.filter((city) =>
      city.city.toLowerCase().startsWith(value.toLowerCase())
    );
    setCitySuggestions(filteredSuggestions);
    validateField('city', value);
  };

  const handleSuggestionClick = (city) => {
    setFormData((prev) => ({
      ...prev,
      city: city.city,
      latitude: city.latitude,
      longitude: city.longitude,
    }));
    setShowSuggestions(false);
  };

  const fetchCoordinates = async (city) => {
    try {
      const response = await fetch(`/api/cities?city=${city}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            latitude: data[0].latitude,
            longitude: data[0].longitude,
          }));
        }
      } else {
        throw new Error("City coordinates not found");
      }
    } catch (error) {
      toast.error("Error fetching city coordinates:", error);
    }
  };

  const validateNIC = (nic) => {
    const oldNICRegex = /^(?:[0-9]{9}[vVxX])$/;
    const newNICRegex = /^(?:20(?:0[0-9]|1[0-9]|2[0-4])[0-9]{7}[0-9])$/;
    if (!oldNICRegex.test(nic) && !newNICRegex.test(nic)) {
      return "Invalid NIC format";
    } else if (nic.length === 12) {
      const year = parseInt(nic.substring(0, 4));
      if (year > new Date().getFullYear()) {
        return "NIC's year should be lower than or equal to the current year";
      }
    }
    return "";
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = /^[a-zA-Z\s]*$/.test(value) ? (value.length < 1 ? 'Name is required' : '') : 'Name should contain only letters and spaces';
        break;
      case 'email':
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        break;
      case 'mobile':
        error = /^[0-9]{10}$/.test(value) && value[0] === '0' ? '' : 'Mobile number should be 10 digits and start with 0';
        break;
      case 'city':
        error = value.length < 1 ? 'City is required' : '';
        break;
      case "NIC":
        error = validateNIC(value);
        break;
      case 'landAddress':
        error = value.length < 1 ? 'Field address is required' : '';
        break;
      default:
        break;
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLandDeed(file);
    validateField('landDeedUrl', file);
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

  const handleSubmit = async () => {
    try {
      let isValid = true;
      Object.keys(formData).forEach((key) => {
        validateField(key, formData[key]);
        if (formErrors[key]) {
          isValid = false;
        }
      });
  
      if (isValid) {
        if (landDeed) {
          const fileName = new Date().getTime() + landDeed.name;
          const storageRef = ref(storage, 'files/landDeeds/' + fileName);
          const uploadTask = uploadBytesResumable(storageRef, landDeed);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setLandDeedPerc(Math.round(progress));
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('DownloadURL - ', downloadURL);
                setFormData(prev => ({
                  ...prev,
                  landDeedUrl: downloadURL // Make sure landDeedUrl is set correctly
                }));
                submitFormData({...formData, landDeedUrl: downloadURL}); // Pass the updated formData with landDeedUrl to submitFormData
              });
            }
          );
        } else {
          submitFormData(formData);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  const submitFormData = async (formData) => {
    try {
      const joiningRequestResponse = await axios.post("/JoiningRequest/add", formData);
      const joinRequestId = joiningRequestResponse.data._id;
  
      const existingPendingSupplierResponse = await axios.get(`/pendingSupplier/getByJoiningRequestId/${joinRequestId}`);
      
      if (!existingPendingSupplierResponse.data) {
        const pendingSupplierData = {
          ...formData,
          joinRequestId: joinRequestId
        };
        
        await axios.post("/pendingSupplier/add", pendingSupplierData);
      }
  
      toast.success("Your Joining Request has been sent sucessfully");
  
    } catch (error) {
      toast.error("Error occurred while sending request.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className='hero' style={{height:800}}>
        <div>
          <img src={fruits} className='background' alt="Hero Background"></img>
        </div>
        <div className="container">
          <div className="col-lg-12">
            <div className="hero-text">
              <br/>
              <p className='text1 '>Join With Us</p>
              <p className='text2 fs-3'>Let's spread the freshness together!</p>
            </div>
            <div className="hero-dot-play">
              
            </div>
          </div>
        </div>   
      </div>

      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 mt-5 ">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-5 mt-5">Want to join with us ?</h3>
                <form onSubmit={handleFormSubmit} className='d-flex flex-column m-3 gap-15'>
                  
                  <legend>Personal Details</legend>
                  <div className="form-group">
                    <input type="text" value={formData.name} name="name" className={`form-control ${formErrors.name && 'is-invalid'}`} onChange={handleChange} placeholder='Name' maxLength={50} required />
                    {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                  </div>
                  
                  <div className="form-group">
                    <input type="text" value={formData.email} name="email" className={`form-control ${formErrors.email && 'is-invalid'}`} onChange={handleChange} placeholder='Email' maxLength={50} required/>
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                  </div>

                  <div className="form-group">
                    <input type="text" value={formData.mobile} name="mobile" className={`form-control ${formErrors.mobile && 'is-invalid'}`} onChange={handleChange} placeholder='Mobile' maxLength={10} required/>
                    {formErrors.mobile && <div className="invalid-feedback">{formErrors.mobile}</div>}
                  </div>

                  <div className="form-group">
                    <input type="text" value={formData.city} name="city" className={`form-control ${formErrors.city && 'is-invalid'}`} onChange={handleCityChange} placeholder='City' maxLength={20} required/>
                    {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
                    {showSuggestions && citySuggestions.length > 0 && (
                      <ul className="list-group">
                        {citySuggestions.map((city, index) => (
                          <li
                            key={index}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSuggestionClick(city)}
                          >
                            {city.city}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* <div className="form-group">
                    <input type="text" value={formData.NIC} name="NIC" className={`form-control ${formErrors.NIC && 'is-invalid'}`} onChange={handleChange} placeholder='NIC' maxLength={12} required/>
                    {formErrors.NIC && <div className="invalid-feedback">{formErrors.NIC}</div>}
                  </div> */}

                      
                  <legend>Field Details</legend> 

                  <div className="form-group">
                    <input type="text" value={formData.landAddress} name="landAddress" className={`form-control ${formErrors.landAddress && 'is-invalid'}`} onChange={handleChange} placeholder='Address of the field' maxLength={70} required/>
                    {formErrors.landAddress && <div className="invalid-feedback">{formErrors.landAddress}</div>}
                  </div>

                  <div className="form-group">
                    <input type="Float" value={formData.fieldArea} name="fieldArea" className={`form-control ${formErrors.fieldArea && 'is-invalid'}`} onChange={handleChange} placeholder='Field-Area (in perches)' maxLength={12} required/>
                    {formErrors.fieldArea && <div className="invalid-feedback">{formErrors.fieldArea}</div>}
                  </div>

                  <div className="form-group">
                    <label>{landDeedPerc > 0 && "Uploading: "+ landDeedPerc+ "%"}Land-Deed (PDF)</label>
                    <input type="file" name="landDeedUrl" className={`form-control ${formErrors.landDeedUrl && 'is-invalid'}`} onChange={handleFileChange} required />
                    {formErrors.landDeedUrl && <div className="invalid-feedback">{formErrors.landDeedUrl}</div>}
                  </div>
                  
                  <div className="form-group">
                    <button type="submit" className="button mb-2">Submit</button>
                  </div>

                </form>
              </div>
                  
              <div className="col">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d990.3161028665752!2d80.02407676963402!3d6.858879999571241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTEnMzIuMCJOIDgwwrAwMScyOS4wIkU!5e0!3m2!1sen!2slk!4v1712777684232!5m2!1sen!2slk" 
                  width="600"
                  height="450"
                  className='border-0 w-100 h-100'
                  allowFullScreen="" 
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="map">
                </iframe>

              </div>
                  
            </div>
          </div>        
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
  )
}

export default JoinWithUs;
