const errorHandler = (err, req, res, next) => {

    console.log(err);

    if (err.name === "ErrorNotFound") {
        res.status(404).json({ message: "Error Not Found" })
    } else if (err.name === "ErrorNotFound") {
        res.status(404).json({ message: "Error Not Found" })
    } else if (err.name === "InvalidFile") {
        res.status(400).json({ message: "File Invalid" })
    } else if (err.name === "InvalidExt") {
        res.status(400).json({ message: "Invalid Image Extension" })
    }

    else {
        res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports = errorHandler;