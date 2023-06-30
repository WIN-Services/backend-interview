'use strict';

const path = require("path");
const { readdirSync } = require("fs");
const config = require("../../../../config");

const express = require('express');
const routes = express.Router();

const ignore = ['validations']

const basePath = ``;
const getDirectories = (source) =>
    readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
const routeDirectories = getDirectories(path.resolve(__dirname, "./"));

console.log("---PANEL---");


module.exports = (app) => {
    app.use( routes.get('/test',(req,res)=>{
        return res.send('ok')
    }))
    routeDirectories.map((dir) => {
        if(ignore.includes(dir)) return
        console.log(`./${dir}`)
        app.use(
            `/service/panel/orderService/${dir}/${basePath}`,
            require(`./${dir}`)
        );
    });
};












