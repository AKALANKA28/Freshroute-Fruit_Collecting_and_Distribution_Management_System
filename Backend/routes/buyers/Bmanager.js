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

// Delete request
router.delete("/request/delete/:id", (req, res) => {
    Request.findByIdAndRemove(req.params.id).exec()
        .then((deleteRequest) => {
            res.status(200).json({ message: "Delete Successful", deleteRequest });
        })
        .catch((err) => {
            res.status(400).json({ message: "Delete Unsuccessful", error: err });
        });
});

// Get a specific request
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
