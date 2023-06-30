const express = require("express");
const router = express.Router();
const { readdirSync } = require("fs");
const path = require("path");


const getRouteFiles = (source) =>
    readdirSync(source, { withFileTypes: true })
        .filter((dirent) => !dirent.isDirectory() && dirent.name.includes("routes"))
        .map((dirent) => dirent.name);

const routeFiles = getRouteFiles(path.resolve(__dirname, "./"));

routeFiles.forEach((file) => {
    console.log(`/${file.split(".")[0]}`)
    router.use(`/${file.split(".")[0]}`, require(`./${file}`));
});


module.exports = router;