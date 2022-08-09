import User from "../../models/userModel/user.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {

    const { email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
        return res.status(404).json("Email Alredy Exist");
    }
    if (password.length < 6) {
        return res.status(404).json("Password must contained 6 characters or more");
    }

    const user = await User.create({
        email,
        password: CryptoJS.AES.encrypt(JSON.stringify({ password }), process.env.PASSWORD_SEC_MSG).toString()
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            password: user.password
        })
    } else {
        res.status(400).json("User creation failed!");
    }
}


export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Please, insert correct email address!" });

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC_MSG)
    const decodedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (decodedPassword !== JSON.stringify({ password })) return res.status(401).json("Please, insert corect password!");

    const accessToken = jwt.sign({
        id: user._id,
    },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
    )

    if (user) {
        res.json({
            _id: user._id,
            email: user.email,
            password: user.password,
            accessToken: accessToken
        });

    } else {
        res.status(401).json("Invalid Password or Email");
    }
}


export const updateUser = async (req, res) => {

    const { password } = req.body
    if (password.length < 6) {
        return res.status(404).json("Password must contained 6 characters or more")

    }
    else if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(JSON.stringify({ password }), process.env.PASSWORD_SEC_MSG).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        return res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json('User update fail!');
    }
}