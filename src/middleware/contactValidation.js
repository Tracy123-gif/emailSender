export default (req, res, next) => {
    const { fullName, email, message } = req.body;
    if (!fullName || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    next();
};
