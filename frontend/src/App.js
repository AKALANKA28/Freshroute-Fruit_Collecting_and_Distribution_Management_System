import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Form from "./components/Form";



axios.defaults.baseURL = "http://localhost:3000/"


function App() {

  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)

  const [data, setData] = useState({
    name : "",
    age : "",
    gender : "",
  })

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    name : "",
    age : "",
    gender : "",
  })

  const handleOnChange = (e) =>{
    const {value,name} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
      
    }) 
  }


  //add data
  const handleSubmit = async(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8070/test/add", data).then(() => {
      alert("Student Added")
      getFetchData()
    }).catch((err) =>{
      alert(err)
    })
   
  }

 //get data
  const [dataList, setDataList] = useState([]);

  const getFetchData = async()=>{
  axios.get("http://localhost:8070/test/").then((res) => {
      setDataList(res.data);
  }).catch((err) =>{
      alert(err)
    })
  }

  useEffect(()=>{
    getFetchData();
  },[])


  //edit data
  const handleUpdate = async(e) => {
    e.preventDefault()
    console.log("Updating student with ID:", dataEdit._id);
   axios.patch(`http://localhost:8070/test/update/${dataEdit._id}`, dataEdit)
  .then(() => {
    alert("Student Updated");
  })
  .catch((err) => {
    console.log(err);
    alert(err);
  });

   
  }

  const handleEditOnChange = async(e) => {
    const {value,name} = e.target;
    setDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value,
      }
      
    }) ;
  };

  const handleEdit = (e1) =>{
    setDataEdit(e1)   
    setEditSection(true)
  };

  //delete data
  const handleDelete = async(id) => {
  axios.delete("http://localhost:8070/test/delete/"+id).then(() => {
      alert("Successfully Delete")
      getFetchData()

    })

  }

  return (
    <>
    <sidebar/>
    <div className="container">
      <button className="btn" onClick={() => setAddSection(true)}>Add</button>
      {
       addSection &&(
        <Form
          handleSubmit = {handleSubmit}
          handleOnChange = {handleOnChange}
          rest = {data}
        />
      )
      }
        
      {
        editSection && (
          <Form
            handleSubmit = {handleUpdate}
            handleOnChange = {handleEditOnChange}
            rest = {dataEdit}
          />
        )
      }
      
      <div className='table table-striped'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            dataList[0]? (
              dataList.map((e1) =>{
                return(
                  <tr key={e1._id}>
                    <td>{e1.name}</td>
                    <td>{e1.age}</td>
                    <td>{e1.gender}</td>
                    <td>
                       <button className='btn btn-edit' onClick = {() => handleEdit(e1)} >Edit</button>    
                       <button className='btn btn-delete' onClick = {()=>handleDelete(e1._id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            )
            :(
              <p>No Data</p>
            )
            
          }
            
          
        </tbody>
      </table>

      </div>

    </div>

    

</> 
  );
}

export default App;
