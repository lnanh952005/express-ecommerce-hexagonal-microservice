https://stackoverflow.com/questions/79597051/is-there-any-way-to-modify-req-query-in-express-v5

app.use((req, res, next) => {
    Object.defineProperty(req, 'query', { ...Object.getOwnPropertyDescriptor(req, 'query'), value: req.query, writable: true });
    next();
});
