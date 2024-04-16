import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const users = [
  { id: 0, name: "Jane Doe" },
  { id: 1, name: "Ravenhorst" },
  { id: 2, name: "Max Mustermann" },
];

const server = createServer((request, response) => {
  console.log(request.url);

  if (request.url.startsWith("/api")) {
    if (request.url === "/api/users") {
      response.end(JSON.stringify(users));
      return;
    }

    if (request.url === "/api/users/0") {
      response.end(JSON.stringify(users[0]));
      return;
    }
  }

  if (request.url === "/") {
    const file = readFileSync("./index.html");
    response.statusCode = 200;
    response.end(file);
    return;
  }

  if (request.url === "/cats/401") {
    const image = readFileSync("./assets/401.jpg");
    response.statusCode = 200;
    response.end(image);
    return;
  }

  if (request.url === "/cats/404") {
    const image = readFileSync("./assets/404.jpg");
    response.statusCode = 200;
    response.end(image);
    return;
  }

  if (request.url === "/cats/500") {
    const image = readFileSync("./assets/500.jpg");
    response.statusCode = 200;
    response.end(image);
    return;
  }

  if (request.url === "/test") {
    response.end("This is a test.");
    return;
  }

  response.statusCode = 404;
  response.end("Page not found.");
});

server.listen(8000, () => {
  console.log("Server up and running on http://localhost:8000");
});
