import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import Container from "../../Website/Components/Container";
import { updateProfile } from "../../features/user/userSlice";


const profileSchema = yup.object({
    name: yup.string().required("Username is Required"),
    email: yup
      .string()
      .nullable()
      .email("Email Should be Valid")
      .required("Email is Required"),
    mobile: yup
      .string()
      // .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Please enter a valid phone number")
      .required("A phone number is required"),
  });

const Profile = () => {

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const config2 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};


    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth)
    const [edit, setEdit] = useState(true)
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          name: userState?.name,
          email: userState?.email,
          mobile: userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
          dispatch(updateProfile({ data: values, config2: config2}));
          setEdit(true)
        },
      });
  return (
    <div>
      
    </div>
  )
}

export default Profile
