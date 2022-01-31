const User = require('../model/user')
const jwt = require('jsonwebtoken') // authentication
const expressJwt = require('express-jwt')//authorization
const crypto = require('crypto')
const Token = require('../model/token')
const sendEmail = require('../utils/setEmail')

// register user
exports.userRegister = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    User.findOne({ email: user.email }, async (error, data) => {
        if (data == null) {
            user = await user.save()
            if (!user) {
                return res.status(400).json({ error: "Something went wrong." })
            }
            // at first store token and user id in the token model
            let token = new Token({
                token: crypto.randomBytes(16).toString('hex'),
                userId: user._id
            })
            token = await token.save()
            if (!token) {
                return res.status(400).json({ error: "Something went wrong while starting token" })
            }

            const url=process.env.FRONTEND_URL+'\/email\/confirmation\/'+token.token
            //localhost:3000/email/confirmation/12123123132

            // send mail after account is created
            sendEmail({
                from: 'no-reply@myemail.com',
                to: user.email,
                subject: 'Email verification Link',
                text: `Hello! \n\n Please verify your account by clicking the link below: \n\n http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}`,
                html: `<h1>Verify your Email </h1>
                <button><a href="${url}">Verify your email</a></button>`
            })
            res.send(user)
        }
        else {
            return res.status(400).json({ error: "Email already exists. Please choose another email" })
        }
    })
}

//confirming email
exports.postEmailConfirmation = (req, res) => {
    //first find dthe valid or matching token
    Token.findOne({ token: req.params.token }, (error, token) => {
        if (error || !token) {
            return res.status(400).json({ error: "invalid token or token may have expired" })
        }
        // for valid token
        User.findOne({ _id: token.userId }, (error, user) => {
            if (error || !user) {
                return res.status(400).json({ error: "unable to find user." })
            }
            // user already verified
            if (user.isVerified) {
                return res.status(400).json({ error: "email already verified! login to continue" })
            }
            //save the verified user
            user.isVerified = true
            user.save(error => {
                if (error) {
                    return res.status(400).json({ error: error })
                }
                res.json({ message: "congratulations! your account has been verified" })
            })
        })
    })
}

//resend verification mail
exports.resendVerificationMail = async (req, res) => {
    //first find the registered User
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "sorry, the email is not found in our system. please try again" })
    }
    //check if email is already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "Email is already verified.login to continue" })
    }

    //create token to store in database and send in the email verification link
    let token = new Token({
        token: crypto.randomBytes(16).toString('hex'),
        userId: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    //send email
    sendEmail({
        from: 'no-reply@myemail.com',
        to: user.email,
        subject: 'Email verification Link',
        text: `Hello! \n\n Please verify your account by clicking the link below: \n\n http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}`,
        html: `<h1>Verify your Email </h1>`
    })
    res.json({ message: "verification link has been sent to your mail" })

}

//signin process
exports.signIn = async (req, res) => {
    const { email, password } = req.body
    // at first check if the email is registered in the database or not
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: "Sorry, the email is not registered." })
    }
    // if the email found then check password for the email.
    if (!user.authenticate(password)) {
        return res.status(400).json({ error: "email and password doesnot match" })
    }
    //now generate token with user id and jwt secret
    const token = jwt.sign({ _id: user._id, user: user.role }, process.env.JWT_SECRET)


    //store token in the cookieparser
    res.cookie('myCookie', token, { expire: Date.now() + 999999 })

    //return user information to frontend
    const { _id, name, role } = user
    return res.json({ token, user: { name, email, role, _id } })

    // check if user is verified or not
    if (!user.isVerified()) {
        return res.status(400).json({ error: "verify your email first to continue" })
    }
}

//signout
exports.signout = (req, res) => {
    res.clearCookie('myCookie')
    res.json({ message: "signout success" })
}


//forget password link
exports.forgetPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "sorry, the email is not found in our system. please enter valid email." })
    }
    let token = new Token({
        userId: user._id,
        token: crypto.randomBytes(16).toString('hex')

    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    //send email
    sendEmail({
        from: 'no-reply@myemail.com',
        to: user.email,
        subject: 'Password Reset Link',
        text: `Hello! \n\n Please reset your password by clicking the link below: \n\n http:\/\/${req.headers.host}\/api\/resetpassword\/${token.token}`,
        html: `<h1>Reset password link </h1>
        <button><a href="${url}">Reset your email</a></button>`

    })
    res.json({ message: "Password reset link has been sent to your mail" })

}

//change password
exports.resetPassword = async (req, res) => {
    //find valid token
    let token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "invalid token or token may have expired" })
    }
    ///if token found then find the valid user for that token
    let user = await User.findOne({
        _id: token.userId,
        email: req.body.email
    })
    if (!user) {
        return res.status(400).json({ error: "Sorry the email provided not associated with this token, please try again with valid email." })
    }
    //reset password
    user.password = req.body.password
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Failed to reset password." })
    }
    res.json({ message: "Password has been reset successfully" })
}

//user list
exports.userList = async (req, res) => {
    const user = await User.find().select('-hashed_password')
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(user)
}

// find user
exports.findUser = async (req, res) => {
    const user = await User.findById(req.params.userid).select('-hashed_password')
    if (!user) {
        return res.status(400).json({ error: "User not found." })
    }
    res.send(user)
}

//require signin
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

