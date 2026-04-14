module.exports = (req, res, next) => {
    try {
        if (req.data.role !== 'admin') {
            return res.status(403).send("Forbidden");
        }
        next();
    } 
    catch (err) {
        return res.status(400).send("Something wrong?" + err);
    }
}