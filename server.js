const app = require('./app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`FITNESS EXERCISE TRACKER running on http://localhost:${PORT}`);
});