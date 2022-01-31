exports.propertyValidation=(req,res,next)=>{
    req.check('property_title', 'Property name is required').notEmpty()
    req.check('property_price','Property price is required').notEmpty()
    .isNumeric()
    .withMessage('Price contains only numeric value')
    req.check('property_location','property location is required').notEmpty()
    req.check('property_desc','Description is required').notEmpty()
    .isLength({
        min:20
    })
    .withMessage('Description must be more than 20 characters.')
    req.check('catagory','Category is required').notEmpty()

    const errors=req.validationErrors()
    if(errors){
        const showError = errors.map(error=>error.msg)[0]
        return res.status(400).json({error:showError})
    }

    next()
}

exports.userValidation=(req,res,next)=>{
    req.check('name', 'Name is required').notEmpty()
    req.check('email','Email is required').notEmpty()
    .isEmail()
    .withMessage('Invalid Email')
    
    req.check('password','Password is required').notEmpty()
    .isLength({
        min:8
    })
    .withMessage('Password must be minimum 8 characters.')

    const errors=req.validationErrors()
    if(errors){
        const showError = errors.map(error=>error.msg)[0]
        return res.status(400).json({error:showError})
    }

    next()
}

