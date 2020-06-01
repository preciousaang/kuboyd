const { port } = require("./src/config/config");
const connectDb  = require("./src/config/db");
const app = require("./src/app/app");

// Main function to connect to the database
connectDb();

app.listen(port, (err) => {
    if (err) console.err(err);
    console.info(`Server started on port ${port}`)
})