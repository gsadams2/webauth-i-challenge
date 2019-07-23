const server = require("./server");

server.get("/", (req, res) => {
  res.send("Hello there!");
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
