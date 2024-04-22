// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from './Navbar/Navbar';
// import Footer from './Footer/Footer';
// import storage from "../../src/firebase"
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// import "./website.css";
// import Container from './Container';

// axios.defaults.baseURL = "http://localhost:8070/";

// const JoinWithUs = () => {
//   const [landDeed, setLandDeed] = useState(undefined);
//   const [landDeedPerc, setLandDeedPerc] = useState(0);
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     city: '',
//     NIC: '',
//     landAddress: '',
//     fieldArea: '',
//     landDeedUrl: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setLandDeed(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (landDeed) {
//         const fileName = new Date().getTime() + landDeed.name;
//         const storageRef = ref(storage, 'files/landDeeds/' + fileName);
//         const uploadTask = uploadBytesResumable(storageRef, landDeed);
  
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setLandDeedPerc(Math.round(progress));
//           },
//           (error) => {
//             console.log(error);
//           },
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//               console.log('DownloadURL - ', downloadURL);
//               setFormData(prev => ({
//                 ...prev,
//                 landDeedUrl: downloadURL // Make sure landDeedUrl is set correctly
//               }));
//               submitFormData({...formData, landDeedUrl: downloadURL}); // Pass the updated formData with landDeedUrl to submitFormData
//             });
//           }
//         );
//       } else {
//         submitFormData(formData); // Pass formData here
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };
  

//   const submitFormData = async (formData) => { // Receive formData as a parameter
//     try {
//       // Step 1: Add the joining request to the "joiningrequests" collection
//       const joiningRequestResponse = await axios.post("/JoiningRequest/add", formData); // Use formData received as a parameter
//       const joinRequestId = joiningRequestResponse.data._id;
  
//       // Step 2: Prepare data for the "pendingsuppliers" collection
//       const pendingSupplierData = {
//         ...formData, // Use formData received as a parameter
//         joinRequestId: joinRequestId // Add joinRequestId to the pending supplier data
//       };
  
//       // Step 3: Add the pending supplier to the "pendingsuppliers" collection
//       await axios.post("/pendingSupplier/add", pendingSupplierData);
  
//       alert("Your request has been submitted successfully!");
  
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Container class1="contact-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-12 mt-5 ">
//             <div className="contact-inner-wrapper d-flex justify-content-between">
//               <div>
//                 <h3 className="contact-title mb-5 mt-5">Want to join with us ?</h3>
//                 <form onSubmit={handleSubmit} className='d-flex flex-column m-3 gap-15'>
                  
//                   <legend>Personal Details</legend>
//                   <div>
//                     <input type="text" value={formData.name} name="name" className="form-control" onChange={handleChange} placeholder='Name' required />
//                   </div>
                  
//                   <div>
//                     <input type="email" value={formData.email} name="email" className="form-control" onChange={handleChange} placeholder='Email' required/>
//                   </div>

//                   <div>
//                     <input type="text" value={formData.mobile} name="mobile" className="form-control" onChange={handleChange} placeholder='Mobile' required/>
//                   </div>

//                   <div>
//                     <input type="text" value={formData.city} name="city" className="form-control" onChange={handleChange} placeholder='City' required/>
//                   </div>

//                   <div>
//                     <input type="text" value={formData.NIC} name="NIC" className="form-control" onChange={handleChange} placeholder='NIC' required/>
//                   </div>

                      
//                   <legend>Field Details</legend> 

//                   <div>
//                     <input type="text" value={formData.landAddress} name="landAddress" className="form-control" onChange={handleChange} placeholder='Address of the field' required/>
//                   </div>

//                   <div>
//                     <input type="Number" value={formData.fieldArea} name="fieldArea" className="form-control" onChange={handleChange} placeholder='Field-Area (in perches)' required/>
//                   </div>

//                   <div>
//                     <label>{landDeedPerc > 0 && "Uploading: "+ landDeedPerc+ "%"}Land-Deed (PDF)</label>
//                     <input type="file" name="landDeedUrl" className="form-control" onChange={handleFileChange} required />
//                   </div>
                  
//                   <div>
//                     <button type="submit" className="button mb-2">Submit</button>
//                   </div>

//                 </form>
//               </div>
                  
//               <div>
//                 <iframe 
//                   src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d990.3161028665752!2d80.02407676963402!3d6.858879999571241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTEnMzIuMCJOIDgwwrAwMScyOS4wIkU!5e0!3m2!1sen!2slk!4v1712777684232!5m2!1sen!2slk" 
//                   width="600"
//                   height="450"
//                   className='border-0 w-100 h-100'
//                   allowFullScreen="" 
//                   loading="lazy"
//                   referrerpolicy="no-referrer-when-downgrade"
//                   title="map">
//                 </iframe>

//               </div>
                  
//             </div>
//           </div>        
//         </div>
//       </Container>

//       <Footer />

//     </div>
//   )
// }

// export default JoinWithUs;


import React, { useState } from "react";
import axios from "axios";
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import storage from "../../src/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import "./website.css";
import Container from './Components/Container';

axios.defaults.baseURL = "http://localhost:8070/";

const JoinWithUs = () => {
  const [landDeed, setLandDeed] = useState(undefined);
  const [landDeedPerc, setLandDeedPerc] = useState(0);
  
  const [formData, setFormData] = useState({
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
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLandDeed(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        submitFormData(formData); // Pass formData here
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  const submitFormData = async (formData) => { // Receive formData as a parameter
    try {
      // Step 1: Add the joining request to the "joiningrequests" collection
      const joiningRequestResponse = await axios.post("/JoiningRequest/add", formData); // Use formData received as a parameter
      const joinRequestId = joiningRequestResponse.data._id;
  
      // Step 2: Check if there is already a pending supplier associated with the joining request
      const existingPendingSupplierResponse = await axios.get(`/pendingSupplier/getByJoiningRequestId/${joinRequestId}`);
      
      if (!existingPendingSupplierResponse.data) {
        // Step 3: Prepare data for the "pendingsuppliers" collection
        const pendingSupplierData = {
          ...formData, // Use formData received as a parameter
          joinRequestId: joinRequestId // Add joinRequestId to the pending supplier data
        };
        
        // Step 4: Add the pending supplier to the "pendingsuppliers" collection
        await axios.post("/pendingSupplier/add", pendingSupplierData);
      }
  
      alert("Your request has been submitted successfully!");
  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 mt-5 ">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-5 mt-5">Want to join with us ?</h3>
                <form onSubmit={handleSubmit} className='d-flex flex-column m-3 gap-15'>
                  
                  <legend>Personal Details</legend>
                  <div>
                    <input type="text" value={formData.name} name="name" className="form-control" onChange={handleChange} placeholder='Name' required />
                  </div>
                  
                  <div>
                    <input type="email" value={formData.email} name="email" className="form-control" onChange={handleChange} placeholder='Email' required/>
                  </div>

                  <div>
                    <input type="text" value={formData.mobile} name="mobile" className="form-control" onChange={handleChange} placeholder='Mobile' required/>
                  </div>

                  <div>
                    <input type="text" value={formData.city} name="city" className="form-control" onChange={handleChange} placeholder='City' required/>
                  </div>

                  <div>
                    <input type="text" value={formData.NIC} name="NIC" className="form-control" onChange={handleChange} placeholder='NIC' required/>
                  </div>

                      
                  <legend>Field Details</legend> 

                  <div>
                    <input type="text" value={formData.landAddress} name="landAddress" className="form-control" onChange={handleChange} placeholder='Address of the field' required/>
                  </div>

                  <div>
                    <input type="Number" value={formData.fieldArea} name="fieldArea" className="form-control" onChange={handleChange} placeholder='Field-Area (in perches)' required/>
                  </div>

                  <div>
                    <label>{landDeedPerc > 0 && "Uploading: "+ landDeedPerc+ "%"}Land-Deed (PDF)</label>
                    <input type="file" name="landDeedUrl" className="form-control" onChange={handleFileChange} required />
                  </div>
                  
                  <div>
                    <button type="submit" className="button mb-2">Submit</button>
                  </div>

                </form>
              </div>
                  
              <div>
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

      <Footer />

    </div>
  )
}

export default JoinWithUs;