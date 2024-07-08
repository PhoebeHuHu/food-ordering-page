import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if the account exist
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect email or password" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
//rigister user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //checking is user already exists
        const emailIsExists = await userModel.findOne({ email });
        if (emailIsExists) {
            return res.json({ success: false, message: "User already exists" });
        }

        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "The password must contain more than 8 characters" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser }

/* import库的作用
jsonwebtoken 是一个用于创建和验证 JSON Web Tokens (JWT) 的库。JWT 是一种用于在各方之间安全地传输信息的紧凑且自包含的方式。它们通常用于身份验证和授权。

创建 JWT：生成包含用户信息的令牌，以便在用户登录后返回给客户端。
验证 JWT：在客户端请求时，验证令牌的有效性，确保请求来自经过身份验证的用户。

bcrypt 是一个用于密码哈希和验证的库。它可以帮助你安全地存储用户密码，防止密码泄露。

哈希密码：将用户密码转换为不可逆的哈希值，并存储在数据库中。
验证密码：在用户登录时，将输入的密码与存储的哈希密码进行比对。

validator 是一个用于字符串验证和清理的库。它包含许多常用的验证函数，用于确保用户输入的有效性和安全性。

验证邮箱地址：检查输入的字符串是否为有效的电子邮件地址。
验证URL：检查输入的字符串是否为有效的URL。
清理字符串：去除多余的空格、HTML标签等。
*/