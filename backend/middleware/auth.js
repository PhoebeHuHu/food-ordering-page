import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    //get the token from the request header
    const { token } = req.headers;
    //check if the token exist
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' })
    }
    //if we got the token, we will decode the token
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
}

export default authMiddleware;