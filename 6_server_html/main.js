"use strict";

const port = 3000,
  http = require("http"),
  httpStatusCodes = require("http-status-codes"),
  fs = require("fs"),
  router = require("./router"),
  plainTextContentType = {
    "Content-Type": "text/plain"
  },
  htmlContentType = {
    "Content-Type": "text/html"
  };

/*
const getViewUrl = (url) => {
  return `views${url}.html`;
};
*/

/*
const sendErrorResponse = res => {
  res.writeHead(httpStatus.NOT_FOUND, {
    "Content-Type": "text/html"
  });
  res.write("<h1>File Not Found!</h1>");
  res.end();
};
*/

//  const routeMap = {
//    "/": "views/index.html"
//  };

const customReadFile = (file, res) => {
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors){
      console.log("Error reading the file...");
      }
      res.end(data);
    });
  };

/*
http
  .createServer((req, res) => {
    let url = req.url;
    if(url.indexOf(".html") !== -1){
      res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
      });
      customReadFile(`./views${url}`, res);
    } else if(url.indexOf(".js") !== -1){
      res.writeHead(httpStatus.OK, {
        "Content-Type": "text/javascript"
      });
      customReadFile(`./public/js${url}`, res);
    } else if(url.indexOf(".css") !== -1){
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/css"
        });
        customReadFile(`./public/css${url}`, res);
    } else if(url.indexOf(".png") !== -1){
        res.writeHead(httpStatus.OK, {
          "Content-Type": "image/png"
        });
        customReadFile(`./public/images${url}`, res);
    } else {
      sendErrorResponse(res);
    }
  })
  .listen(port);
*/

router.get("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("INDEX");
});

router.get("/index.html", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  customReadFile("views/index.html", res);
});

router.post("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("POSTED");
});

http.createServer(router.handle).listen(3000);

console.log(`The server has started and is listening on port number: ${port}`);
