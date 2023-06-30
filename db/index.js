"use strict";

const path = require("path");
const { readdirSync } = require("fs");

const express = require("express");
const routes = express.Router();

const basePath = ``;
const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
const routeDirectories = getDirectories(path.resolve(__dirname, "./"));

const modelsPath = path.resolve(__dirname, routeDirectories[0]);
readdirSync(modelsPath).forEach((file) => {
  console.log(path.join(modelsPath, file));
  require(path.join(modelsPath, file));
});
