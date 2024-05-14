import React, { useState, useEffect } from "react";
import axios from "axios";
import storage from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

axios.defaults.baseURL = "http://localhost:8070/";

const CategoryForm = ({ handleSubmit, initialData }) => {
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/FruitType/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const [formData, setFormData] = useState({
    imageUrl: "",
    fruit: "",
    category: "",
    date: "",
    quality: "",
  });
  useEffect(() => {
    img && uploadFile(img, "imageUrl");
  }, [img]);

  const uploadFile = (file, fileType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, 'images/fruits/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
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
    if (name === "category" && /[^\p{L}\s]/u.test(value)) {
      return; 
    
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    setFormData(prevState => ({
      ...prevState,
      date: getCurrentDate()
    }));
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">{imgPerc > 0 && "Uploading: "+ imgPerc+ "%"}
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
          <label htmlFor="fruit" className="form-label">
            Fruit
          </label>
          <select
            className="form-control"
            name="fruit"
            onChange={handleChange}
            value={formData.fruit}
            required
          >
            <option value="">Select Fruit</option>
            {dataList.length ? (
              dataList.map((fruit, index) => (
                <option key={index} value={fruit.name}>
                  {fruit.name}
                </option>
              ))
            ) : (
              <option value="">No fruits</option>
            )}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            value={formData.category}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quality" className="form-label">
            Quality
          </label>
          <select
            className="form-control"
            name="quality"
            onChange={handleChange}
            value={formData.quality}
            required
          >
            <option value="">Select Quality</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            name="date"
            placeholder="Date"
            onChange={handleChange}
            value={formData.date}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
