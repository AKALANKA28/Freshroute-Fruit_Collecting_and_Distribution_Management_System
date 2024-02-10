const router = require("express").Router();

let test = require("../models/test");
 
//create

router.route("/add").post((req, res) => {

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender; 

    const newTest = new test({
        name,
        age,
        gender
    })

    newTest.save().then(() => {
        res.json("Student Added")
    }).catch((err) =>{
        console.log(err);
    })

})

//read

router.route("/").get((req, res) =>{
   
    test.find().then((test) =>{
        res.json(test)
    }).catch((err) =>{
        console.log(err)
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    await test.findById(userId)
    .then((test) => {
        res.status(200).send({status: "User fetched"}, test)
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

// Update
router.route("/update/:id").patch(async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, age, gender } = req.body;

        const updateTest = {
            name,
            age,
            gender
        }

        const updatedUser = await test.findByIdAndUpdate(userId, updateTest, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ status: "User not found" });
        }

        res.status(200).json({ status: "User updated", updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});




//delete

router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;

    await test.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})

module.exports = router;








