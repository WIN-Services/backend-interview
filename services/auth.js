const CryptoJs = require('crypto-js')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const register = async (payload) => {
    const { username, email, password } = payload;

    try {

        const newUser = new User({
            username,
            email,
            password: CryptoJs.AES.encrypt(password, process.env.PASS_SEC).toString()
        })

        await newUser.save();

        return { doc: 'user successfully registered' }
    }
    catch {
        throw ("transaction failed")
    }
}

const login = async (payload) => {
    const { username, password } = payload;

    try {
        const user = await User.findOne({ username })

        if (user) {
            const { password: savedPassword } = user;

            const decryptedPassword = CryptoJs.AES.decrypt(savedPassword, process.env.PASS_SEC).toString(CryptoJs.enc.Utf8);

            if (password === decryptedPassword) {
                const { password: existingPassword, ...returnPayload } = user._doc;

                const access_token = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,   
                }, process.env.JWT_SEC, 
                {expiresIn: "1d"}
                )

                return { doc: {...returnPayload, access_token} }
            }

            return { errors: [{ name: 'password', message: 'wrong password' }] };
        }

        return { errors: [{ name: 'user', message: 'no user found with this username' }] };
    }
    catch {
        throw ("transaction failed")
    }
}

module.exports = {
    register,
    login
}