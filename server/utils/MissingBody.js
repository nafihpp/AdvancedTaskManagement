const missingReqBody = (requiredFields, requestFields, res) => {
    const missingFields = requiredFields.filter(
        (field) => !(field in requestFields)
    );
    if (missingFields.length > 0) {
        res.status(401).json({ message: `${missingFields}  are missing` });
    }
};

module.exports = {
    missingReqBody,
};
