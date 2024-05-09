const express = require("express");
const Request = require("../../models/Buyer/Bmanager");

const router = express.Router();

// Save request
router.post("/request/save", (req, res) => {
    let newRequest = new Request(req.body);

    newRequest.save()
        .then(() => {
            res.status(200).json({ success: "Request Saved Successfully" });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

// Get all requests
router.get("/requests", (req, res) => {
    Request.find().exec()
        .then((requests) => {
            res.status(200).json({ success: true, existingRequest: requests });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

// Update request
router.put("/request/update/:id", (req, res) => {
    Request.findByIdAndUpdate(req.params.id, { $set: req.body }).exec()
        .then(() => {
            res.status(200).json({ success: "Update Successful" });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

//delete

router.delete("/request/delete/:id", (req, res) => {
    Request.findOneAndDelete({ _id: req.params.id })
        .then((deletedRequest) => {
            if (!deletedRequest) {
                return res.status(404).json({
                    success: false,
                    message: "Request not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Delete Successful",
                deletedRequest: deletedRequest
            });
        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                message: "Delete Unsuccessful",
                error: err
            });
        });
});


// Get a specific request by id
router.get("/request/:id", (req, res) => {
    Request.findById(req.params.id).exec()
        .then((request) => {
            res.status(200).json({ success: true, request });
        })
        .catch((err) => {
            res.status(400).json({ success: false, error: err });
        });
});



module.exports = router;
