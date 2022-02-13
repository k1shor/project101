const Consultations = require('../model/consultation')

exports.postConsultations = async (req, res) => {
    let consultations = new Consultations({
        property_title: req.body.property_title,
        property_owner: req.body.property_owner,
        consultation_type: req.body.consultation_type,
        consultation_with: req.body.consultation_with,
        property_location: req.body.property_location,
        property_availability: false,
        property_price: req.body.property_price,
        property_status: req.body.property_status,
        property_image: req.body.property_image,
        listing_type: req.body.listing_type,
        booked_by: req.body.booked_by,
        category: req.body.category,
    })
    consultations = await consultations.save()
    if (!consultations) {
        return res.status(400).json({ error: "Something went wrong." })
    }
    res.send(consultations)
}

exports.consultationsList = async (req, res) => {
    const consultations = await Consultations.find()
        .sort({ createdAt: -1 })

    if (!consultations) {
        return res.status(400).json({ error: "somehthing went wrong" })
    }
    res.send(consultations)

}

exports.consultationDetails = async (req, res) => {
    const consultations = await Consultations.findById(req.params.id)
    if (!consultations) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(consultations)
    

}

exports.updateConsultations = async (req, res) => {
    const consultations = await consultations.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    )
    if (!consultations) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(consultations)
}

//deleting consultations
exports.deleteconsultations = (req, res) => {
    Consultations.findByIdAndRemove(req.params.id)
    .then(consultations=>{
        if(!consultations){
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
// user consultations
exports.userconsultations = async (req, res) => {
    const consultations = await Consultations.find({ user: req.params.userid })
    if (!consultations) {
        return res.status(500).json({ error: "something went wrong" })
    }
    res.send(consultations)
}