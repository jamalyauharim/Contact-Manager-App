const app = require("./backend/app");
const http = require("http");


const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
};

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);
server.on("listening", onListening);
server.listen(port);
