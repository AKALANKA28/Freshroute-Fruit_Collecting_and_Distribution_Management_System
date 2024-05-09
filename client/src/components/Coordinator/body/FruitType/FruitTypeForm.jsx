import React, { useState, useEffect } from "react";
import storage from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const FruitTypeForm = ({ handleSubmit, initialData }) => {
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    date: "",
    description: ""
  });
  const [uploading, setUploading] = useState(false); // Track if image is being uploaded

  useEffect(() => {
    img && uploadFile(img, "imageUrl");
  }, [img]);

  const uploadFile = (file, fileType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, 'images/fruits/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true); // Start uploading

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setUploading(false); // Stop uploading on error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('DownloadURL - ', downloadURL);
          setFormData((prev) => ({
            ...prev,
            [fileType]: downloadURL
          }));
          setUploading(false); // Stop uploading after successful upload
        });
      }
    );
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    setFormData(prevState => ({
      ...prevState,
      date: currentDate
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "name" && /[^\p{L}\s]/u.test(value)) {
      return; 
    }
  
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
        <label htmlFor="imageUrl" className="form-label">{uploading ? `Uploading: ${imgPerc}%` : "Image"}</label>
        <input
          type="file"
          className="form-control"
          name="imageUrl"
          onChange={(e) => setImg(e.target.files[0])}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Fruit Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Fruit Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          placeholder="Date"
          onChange={handleChange}
          value={formData.date}
          min={getCurrentDate()} // Set the min attribute to today's date
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          required
        />
      </div>
      
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
  );
};

export default FruitTypeForm;
