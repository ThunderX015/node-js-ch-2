// const fs = require("fs");
// const http = require("http");

// fs.writeFile(
//   "sample.txt",
//   "Hello World. Welcome to Node.js File System module.",
//   (err) => {
//     if (err) throw err;
//     console.log("File created!");
//   }
// );

//filestream server

// fs.readFile("sample.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// const server = http.createServer((req, res) => {
//   const stream = fs.createReadStream("sample.txt");
//   stream.pipe(res);
// });

// server.listen(3000);

//reading from CLI
// const readline = require("readline");

// const lineDetail = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// lineDetail.question(`Name - `, (name) => {
//   console.log(`Hello ${name}!`);
//   lineDetail.close();
// });

//read multiple command line args - minimist package

// const args = require("minimist")(process.argv.slice(2));

// console.log(args);

const http = require("http");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHead(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();

        break;

      case "/registration":
        response.write(registrationContent);
        response.end();
        break;

      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args["port"]);
