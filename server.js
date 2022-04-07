import * as tf from '@tensorflow/tfjs';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import '@tensorflow/tfjs-node';

// let tf  = require("@tensorflow/tfjs");
// let express = require("express");
// let path = require('path')
// require('@tensorflow/tfjs-node');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let app = express();

const PORT = process.env.PORT || 80

app.use(function(req, res, next) {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    next();
});

app.use(express.static(__dirname + "/static"));

app.listen(PORT, function() {
    console.log(PORT);
    console.log('C:/Users/lipuc/Desktop/test_prog/TensorFlowJS/static/mobile_net/model.json');
});

class AI {

    compile() {
        const model = tf.loadLayersModel('file://static/mobile_net/model.json');
        console.log("model succses");
    }

    run() {

    }

}

const ai = new AI();
ai.compile();