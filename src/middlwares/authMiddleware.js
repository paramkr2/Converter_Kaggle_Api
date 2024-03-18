import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.secretKey);

        // Attach the decoded payload to the request object for further processing
        res.locals = decoded;
        next();
    } catch (error) {
        // If verification fails, return an error response
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
