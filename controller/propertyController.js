const Property = require('../model/property')

// to store property in database

exports.postProperty = async (req, res) => {
    let property = new Property({
        property_title: req.body.property_title,
        property_location: req.body.property_location,
        property_availability: true,
        property_desc: req.body.property_desc,
        property_price: req.body.property_price,
        listing_type:req.body.listing_type,
        property_image: req.file.path,
        category: req.body.category
    })
    property = await property.save()
    if (!property) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(property)


}

// to show all Property 
exports.showProperties=async(req,res)=>{
    const property = await Property.find()
    if(!property){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(property)
}

// to show single property
exports.findProperty = async (req, res) => {
    const property = await Property.findById(req.params.id)
    if (!property) {
        return res.status(400).json({ error: "Property not found." })
    }
    res.send(property)
}

// to delete a property
exports.deleteProperty = (req, res) => {
    Property.findByIdAndRemove(req.params.id)
        .then(property => {
            if (!property) {
                return res.status(400).json({ error: "Property not found." })
            }
            else {
                return res.status(200).json({ message: "Property deleted" })
            }
        })
        .catch(err => {
            return res.status(400).json({ error: err })
        })
}

// to update property
exports.updateProperty = async (req, res) => {
    const property = await Property.findByIdAndUpdate(
        req.params.id,
        {
            property_title: req.body.property_title,
            property_price: req.body.property_price,
            property_location: req.body.property_location,
            property_desc: req.body.property_desc,
            listing_type:req.body.listing_type,
            // property_image: req.file.path,
            category: req.body.category
        },
        { new: true }
    )
    if (!property) {
        return res.status(400).json({ error: "Property not found." })
    }
    res.send(property)
}


// to show all property inside a category 
exports.showProperty = async (req, res) => {
    const property = await Property.findById(req.params.category)
    if (!Property) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(Property)
}


//property list related to same category
exports.listRelated = async (req, res) => {
    let single_property = await Property.findById(req.params.id)
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    let property = await Property.find({
        _id: { $ne: single_property },
        category: single_property.category
    })
        .limit(limit)
        .populate('category', 'category_name')
    if (!property) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(property)
}

// to filter property by category and price range
exports.listBySearch = async (req, res) => {
    let order = req.body.order ? req.body.order : 'desc'
    let sorBy = req.body.sortBy ? req.body.sortBy : '_id'
    let limit = req.body.limit ? parseInt(req.body.limit) : 200
    let skip = parseInt(req.body.skip)
    let findArgs = {}

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "property_price") {
                //gte -> greater than price [20-30]
                //lte -> less than price []
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }
            else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }


    const property = await Property.find(findArgs)
        .populate('category')
        .sort([[sorBy, order]])
        .limit(limit)
        .skip(skip)

    if (!property) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.json({
        size: property.length,
        property
    })
}