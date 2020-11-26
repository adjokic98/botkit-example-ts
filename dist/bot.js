"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Botkit = require('botkit').Botkit;
var BotkitCMSHelper = require('botkit-plugin-cms').BotkitCMSHelper;
var WebAdapter = require('botbuilder-adapter-web').WebAdapter;
var MongoDbStorage = require('botbuilder-storage-mongodb').MongoDbStorage;
var fetch = require("node-fetch");
var path = __importStar(require("path"));
var express = require('express');
var BotkitConversation = require("botkit").BotkitConversation;
// load process.env values from .env file
require('dotenv').config();
var storage = null;
if (process.env.mongo_uri) {
    storage = new MongoDbStorage({
        url: process.env.mongo_uri,
    });
}
var adapter = new WebAdapter({});
var controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter: adapter,
    storage: storage
});
if (process.env.CMS_URI) {
    controller.usePlugin(new BotkitCMSHelper({
        uri: process.env.CMS_URI,
        token: process.env.CMS_TOKEN,
    }));
}
var index = path.join(__dirname, 'features');
controller.loadModules(index);
// once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(function () {
    console.log("ready");
    // load traditional developer-created local custom feature modules
    var index = path.join(__dirname, 'features');
    controller.loadModules(index);
    /* catch-all that uses the CMS to trigger dialogs */
});
//# sourceMappingURL=bot.js.map