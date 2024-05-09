const FruitDetail = require('../../models/coordinator/FruitDetail');

// Add new quality record or edit existing record / Update existing record qualities
exports.addEditQuality = async (req, res) => {
    try {
        const { id, qualityDesc, storageCond, qualityStatus } = req.body;
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
        console.error(err);
        res.status(500).json({ status: "Error updating quality record", error: err.message });
    }
};

// Retrieve all quality records
exports.getAllQualities = async (req, res) => {
    try {
        const filter = { qualityStatus: 1 }; // get quality added records only
        const allQualities = await FruitDetail.find(filter);
        res.json(allQualities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
};
// Retrieve all quality records
exports.getUndefinedQualityList = async (req, res) => {
    try {
        const filter = { qualityStatus: 0 }; // get quality added records only
        const allQualities = await FruitDetail.find(filter);
        res.json(allQualities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
};

// Retrieve all quality records
exports.getCategorizedFruitDetail = async (req, res) => {
    try {
        const filter = { qualityStatus: 0 }; // get quality added records only

        const allValidQualities = await FruitDetail.find(filter, 'fruit category quality');

        const result= categorizeData(allValidQualities);

        res.json(result);

    } catch (err) {
        console.error(err);
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
        console.error(err);
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

            res.status(200).json({ status: "Quality record deleted", updatedQuality });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: "Error deleting quality record", error: err.message });
        }
   
};

// Retrieve filtered quality records
exports.getFilteredQualities = async (req, res) => {
    try {
        let filter = {};
        const filterType = req.body.filterType;
        const filterValue = req.body.filterValue;

        switch (filterType) {
            case 'fruit':
                filter = { fruit: new RegExp(filterValue, 'i'), qualityStatus: 1 };
                break;
            case 'category':
                filter = { category: new RegExp(filterValue, 'i'), qualityStatus: 1 };
                break;
            case 'quality':
                filter = { quality: new RegExp(filterValue, 'i'), qualityStatus: 1 };
                break;
            case 'qualityDesc':
                filter = { qualityDesc: new RegExp(filterValue, 'i'), qualityStatus: 1 };
                break;
            case 'storageCond':
                filter = { storageCond: new RegExp(filterValue, 'i'), qualityStatus: 1 };
                break;
            default:
                return res.status(400).json({ message: 'Invalid filter type' });
        }

        const filteredQualities = await FruitDetail.find(filter);
        res.json(filteredQualities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
};


const categorizeData = (fruitDetails) => {

    const categorizeByFruit = fruitDetails.reduce((accumulator,fruitDetail ) =>{
        if (!accumulator[fruitDetail.fruit]) {
            accumulator[fruitDetail.fruit] = [];
        }
        accumulator[fruitDetail.fruit].push({ category: fruitDetail.category, quality: fruitDetail.quality, id: fruitDetail._id });
        return accumulator;
    },{});

    for (const fruit in categorizeByFruit) {
        const categorizeByType = categorizeByFruit[fruit].reduce((accumulator, fruitObj) =>{
            if (!accumulator[fruitObj.category]) {
                accumulator[fruitObj.category] = [];
            }
            accumulator[fruitObj.category].push({quality: fruitObj.quality, id: fruitObj.id});
            return accumulator
        },{});
        categorizeByFruit[fruit] = categorizeByType;
    }
    return categorizeByFruit;
}
