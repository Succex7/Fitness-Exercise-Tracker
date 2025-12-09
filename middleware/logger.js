function logger (req, res, next) {
    const time = new Date().toISOString();
    console.log(`${req.method} ${req.url} ${time}`);
    next();
}

export default logger;