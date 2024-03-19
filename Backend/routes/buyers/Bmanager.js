const express = require("express")
const Request = require("../../models/Buyer/Bmanager");

const router = express.Router();

//save request

router.post("/request/save", (req, res) =>{
  let newRequest = new Request(req.body);

  newRequest.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      })
    }
    return res.status(200).json({
      success:"Request Save Successfully"
    })
  })
})

//get details

router.get("/requests", (req, res) =>{
    Request.find().exec((err, requests) =>{
      if(err){
        return res.status(400).json({
          error:err
        })
      }

      return res.status(200).json({
        success:true,
        existingRequest:requests
      })
    })
})

//update

router.put("/request/update/:id", (req, res) =>{
    Request.findByIdAndUpdate(
     req.params.id,
     {
       $set:req.body
     },
     (err, request) =>{
       if(err){
         return res.status(400).json({error:err})
       }
 
       return res.status(200).json({
         success:"update successfully"
       })
     }
    )
 })

 //delete

router.delete("/request/delete/:id", (req, res) =>{
    Request.findByIdAndRemove(req.params.id).exec((err, deleteRequest) =>{
      if(err) return res.status(400).json({
        message:"Delete Unsuccessfull", err
      })
  
      return res.json({
        message:"Delete Susccessfull" , deleteRequest
      })
    })
  })

  //get a specific request

router.get("/request/:id",(req, res) =>{
    let requestId = req.params.id;
  
    Request.findById(requestId,(err, request) =>{
      if(err){
        return res.status(400).json({success:fails, err})
      }
  
      return res.status(200).json({
        success:true,
        request
      })
    })
  })
  
  module.exports = router 
















  
// const router = express.Router();
// const BuyerCtrl = require("../../controllers/Buyer/BuyerCtrl")

// const express=require("express");

// router.post("/request/save", BuyerCtrl.newRequest);
// router.get("/requests", BuyerCtrl.Request.find);
// router.put("/request/update/:id", BuyerCtrl.Request.findByIdAndUpdate);
// router.delete("/request/delete/:id", BuyerCtrl.Request.findByIdAndRemove);
// router.get("/request/:id", BuyerCtrl.Request.findById);

// module.exports = router



// const router = express.Router();
// const BuyerCtrl = require("../../controllers/Buyer/BuyerCtrl")
// const { saveRequest, getRequests, updateRequest, deleteRequest,getRequestById } = require("../../controllers/Buyer/BuyerCtrl");

// const express=require("express");

// router.post("/request/save", saveRequest);
// router.get("/requests", getRequests);
// router.put("/request/update/:id", updateRequest);
// router.delete("/request/delete/:id", deleteRequest);
// router.get("/request/:id", getRequestById);

// module.exports = router

// const express = require("express");
// const { saveRequest, getRequests, updateRequest, deleteRequest, getRequestById } = require("../../controllers/Buyer/BuyerCtrl");


// const router = express.Router();

// router.post("/request/save", saveRequest);
// router.get("/requests", getRequests);
// router.put("/request/update/:id",updateRequest);
// router.delete("/request/delete/:id",deleteRequest);
// router.get("/request/:id",getRequestById);

// module.exports = router;
