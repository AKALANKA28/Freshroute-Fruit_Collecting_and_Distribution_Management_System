const router = require("express").Router();

let farmers = require("../models/farmers/farmers");


//create

router.route("/addFarmer").post((req, res) => {

    const NIC = req.body.NIC;
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const city = req.body.city;
    const lane = req.body.lane;

    const newFarmer = new farmer({
        
        NIC,
        username,
        name,
        email,
        city,
        lane
    })

    newFarmer.save().then(() => {
        res.json("Farmer Added Successfully")
    }).catch((err) =>{
        console.log(err);
    })

})

//read

router.route("/").get((req, res) =>{
   
    test.find().then((farmer) =>{
        res.json(farmer)
    }).catch((err) =>{
        console.log(err)
    })
})


router.route("/getFarmer/:id").get(async (req, res) => {
    let farmerId = req.params.id;
    await test.findById(farmerId)
    .then((farmer) => {
        res.status(200).send({status: "Farmer fetched"}, farmer)
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get farmer", error: err.message});
    })
})

// Update
router.route("/update/:id").patch(async (req, res) => {
    try {
        const farmerId = req.params.id;
        const { NIC,username, name,email,city,lane } = req.body;

        const updateFarmer = {
            
            NIC,
            username,
            name,
            email,
            city,
            lane
        }

        const updatedFarmer = await farmer.findByIdAndUpdate(farmerId, updateFarmer, { new: true });

        if (!updatedFarmer) {
            return res.status(404).json({ status: "Farmer not found" });
        }

        res.status(200).json({ status: "Farmer updated", updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

//delete

router.route("/delete/:id").delete(async(req,res) => {
    let farmerId = req.params.id;

    await farmer.findByIdAndDelete(farmerId)
    .then(() => {
        res.status(200).send({status: "Farmer Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete farmer", error: err.message});
    })
})

module.exports = router;