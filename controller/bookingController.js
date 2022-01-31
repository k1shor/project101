const bookings = require('../model/bookings')

exports.postbookings = async (req, res) => {
    

    let bookings = new bookings({
        user: req.body.user,
        property: req.body.property_title,
    })
    bookings = await bookings.save()
    if (!bookings) {
        return res.status(400).jsorn({ error: "the bookings cannot be completed" })
    }
    res.send(bookings)
}

exports.bookingList = async (req, res) => {
    const bookings = await Bookings.find()
        .populate('user', 'name')
        .sort({ createdAt: -1 })

    if (!bookings) {
        return res.status(400).json({ error: "somehthing went wrong" })
    }
    res.send(bookings)
}

exports.bookingDetails = async (req, res) => {
    const bookings = await bookings.findById(req.params.id)
        .populate('user', 'name')
        .populate('property','property_title')
    if (!bookings) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(bookings)

}

exports.updateStatus = async (req, res) => {
    const bookings = await bookings.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    )
    if (!bookings) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(bookings)
}

//deleting bookings
exports.deletebookings = (req, res) => {
    bookings.findByIdAndRemove(req.params.id).then(async bookings => {
        if (bookings) {
            await bookings.bookingsItems.map(async bookingsItem => {
                await bookingsItem.findByIdAndRemove(bookingsItem)
            })
            return res.json({ message: "bookings has been deleted" })
        }
        else {
            return res.status(500).json({ error: "failed to delete bookings" })
        }
    })
        .catch(error => {
            return res.status(500).json({ error: err })
        })
}

// user bookingss
exports.userbookings=async(req,res)=>{
    const userbookingsList = await bookings.find({user:req.params.userid})
    .populate('property','property_title').sort({createdAt:-1})
    if(!userbookingsList){
        return res.status(500).json({error:"something went wrong"})
    }
    res.send(userbookingsList)
}