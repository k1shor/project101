const Bookings = require('../model/bookings')

exports.postbookings = async (req, res) => {
    let bookings = new Bookings({
        property_title: req.body.property_title,
        property_owner: req.body.property_owner,
        property_location: req.body.property_location,
        property_availability: false,
        property_price: req.body.property_price,
        property_status: req.body.property_status,
        property_image: req.body.property_image,
        listing_type: req.body.listing_type,
        booked_by: req.body.booked_by,
        category: req.body.category,
    })
    bookings = await bookings.save()
    if (!bookings) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(bookings)
}

exports.bookingList = async (req, res) => {
    const bookings = await Bookings.find()
        .sort({ createdAt: -1 })

    if (!bookings) {
        return res.status(400).json({ error: "somehthing went wrong" })
    }
    res.send(bookings)

}

exports.bookingDetails = async (req, res) => {
    const bookings = await Bookings.findById(req.params.id)
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
    Bookings.findByIdAndRemove(req.params.id)
    .then(booking=>{
        if(!booking){
            return res.status(400).json({error:"Booking not found."})
        }
        else{
            return res.status(200).json({message:"Booking deleted"})
        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}
// user bookingss
exports.userbookings = async (req, res) => {
    const userbookingsList = await bookings.find({ user: req.params.userid })
        .populate('property', 'property_title').sort({ createdAt: -1 })
    if (!userbookingsList) {
        return res.status(500).json({ error: "something went wrong" })
    }
    res.send(userbookingsList)
}