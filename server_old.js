// import * as tf from '@tensorflow/tfjs';
// import express from 'express';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// import '@tensorflow/tfjs-node';

//let get = require('@andreekeberg/imagedata');
let { getSync } = require('@andreekeberg/imagedata');
let tf = require("@tensorflow/tfjs");
let express = require("express");
let mobilenet = require('@tensorflow-models/mobilenet');
let fs = require('fs');
let jpeg = require('jpeg-js');
let path = require('path')
require('@tensorflow/tfjs-node');

//const { Image } = require('canvas');

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
let app = express();

const PORT = process.env.PORT || 80

app.use(function(req, res, next) {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    next();
});

app.use(express.static(__dirname + "/static"));

app.listen(PORT, function() {
    console.log(PORT);
    console.log('/home/icefi/nodetest/static/mobile_net/model.json');
});

var model;



class AI {

    

    compile() {
        model = tf.loadLayersModel('file://' + __dirname + '/static/mobile_net/model.json');
        console.log("model successfully loaded");
    }

    run() {
        model.then(model => {
            //console.log("1");
            //let selectedFile = document.getElementById("image-selector").value;
            //var img1 = Image.load('static/55.png');
            //img1.src = "static/55.png";
            //console.log(img1.src);

            // const img = new Image();
            // img.src = "static/55.png";

            let img = getSync("static/55.png");

            const tensor = tf.browser.fromPixels({data: new Uint8Array(img.data), width: img.width, height: img.height})
                .resizeNearestNeighbor([224, 224])
                .toFloat();

            //let tensor = tf.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat()
            let offset = tf.scalar(127.5)
            let batched = tensor.sub(offset).reverse(2).expandDims()
            const res = classify(batched)
            console.log(res);
    
            
        });
    }

}

const ai = new AI();
ai.compile();
ai.run();
