const FruitDetail = require('../../models/coordinator/FruitDetail');

// Add new quality record or edit existing record / Update existing record qualities
exports.addEditQuality = async (req, res) => {
    try {
        const { id, qualityDesc, storageCond, qualityStatus } = req.body;
        console.log("addEditQuality");
        console.log(id)
        const updatedQuality = await FruitDetail.findByIdAndUpdate(id, {
            $set: {
                qualityDesc: qualityDesc,
                storageCond: storageCond,
                qualityStatus: qualityStatus
            }
        }, { new: true });

        if (!updatedQuality) {
            return res.status(404).json({ status: "Quality not found" });
        }

        res.status(200).json({ status: "Quality record updated", updatedQuality });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating quality record", error: err.message });
    }
};

// Retrieve all quality records
exports.getAllQualities = async (req, res) => {
    try {
        const filter = { qualityStatus: 1 }; // get quality added records only
        const allQualities = await FruitDetail.find(filter);
        console.log(allQualities);
        res.json(allQualities);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
};

// Retrieve all quality records
exports.getAvailableFruitAndCategoryAndGrade = async (req, res) => {
    try {
        const filter = { qualityStatus: 0 }; // get quality added records only
        const allValidQualities = await FruitDetail.find(filter);
        categorizeData(allValidQualities);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
};


// Retrieve a specific quality record by ID
exports.getQualityById = async (req, res) => {
    try {
        const qualityId = req.params.id;
        const foundQuality = await FruitDetail.findById(qualityId);
        
        if (!foundQuality) {
            return res.status(404).json({ status: "Quality not found" });
        }
        
        res.status(200).json({ status: "Quality fetched", quality: foundQuality });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving quality record", error: err.message });
    }
};



// Delete a quality record
exports.removeQuality = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedQuality = await FruitDetail.findByIdAndUpdate(id, {
            $unset: {
                qualityDesc: "",
                storageCond: "",
            },
            $set: {
                qualityStatus: 0,
            }
        }, { new: true });

        if (!updatedQuality) {
            return res.status(404).json({ status: "Quality not found" });
        }

        res.status(200).json({ status: "Quality record updated", updatedQuality });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating quality record", error: err.message });
    }
};

// Retrieve filtered quality records
exports.getFilteredQualities = async (req, res) => {
    try {
        let filter = {};
        const filterType = req.body.filterType;
        const filterValue = req.body.filterValue;

        switch (filterType) {
            case 'fruitCategory':
                filter = { fruitCategory: new RegExp(filterValue, 'i') };
                break;
            case 'grade':
                filter = { grade: new RegExp(filterValue, 'i') };
                break;
            case 'qualityDesc':
                filter = { qualityDesc: new RegExp(filterValue, 'i') };
                break;
            case 'storageCond':
                filter = { storageCond: new RegExp(filterValue, 'i') }; // Assuming filterValue is a string representation of a number
                break;
            default:
                return res.status(400).json({ message: 'Invalid filter type' });
        }
        const filteredQualities = await Quality.find(filter);
        res.json(filteredQualities);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
};



const categorizeData = (objArray) => {

    const categoryMapping = new Map();
    let temp = [];
    objArray.map((obj)=> {
        // console.log(obj);
        if (!categoryMapping.has(obj.category)) {
            categoryMapping.set(obj.category, [{ id: obj._id.value, grade: obj.quality}])
        } else {
            let temArray = categoryMapping.get(obj.category);
            categoryMapping.set(obj.category, [...temArray,{ id: obj._id.value, grade: obj.quality}])
        }
    })
    // console.log(categoryMapping);
    const mappedData = new Map();

    objArray.map((obj)=> {
        if (!mappedData.has(obj.fruit)) {
            mappedData.set(obj.fruit, [categoryMapping.get(obj.category)])
        } else {
            mappedData.set(obj.fruit, [ ...mappedData.get(obj.fruit), categoryMapping.get(obj.category)])
        }
    })

    console.log(mappedData);

}
