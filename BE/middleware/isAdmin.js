module.exports = (req, res, next) => {
    try {
        if (req.data.role !== 'admin') {
            return res.status(403).send("Forbidden");
        }
        next();
    } 
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}