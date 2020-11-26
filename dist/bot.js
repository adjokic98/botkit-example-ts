"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var botkit_1 = require("botkit");
var BotkitCMSHelper = require('botkit-plugin-cms').BotkitCMSHelper;
var fetch = require("node-fetch");
var express = require('express');
var BotkitConversation = require("botkit").BotkitConversation;
var WebAdapter = require('botbuilder-adapter-web').WebAdapter;
var MongoDbStorage = require('botbuilder-storage-mongodb').MongoDbStorage;
// load process.env values from .env file
require('dotenv').config();
var storage = null;
if (process.env.mongo_uri) {
    storage = new MongoDbStorage({
        url: process.env.mongo_uri,
    });
}
var adapter = new WebAdapter({});
var controller = new botkit_1.Botkit({ webhook_uri: '/api/messages', adapter: adapter });
if (process.env.cms_uri) {
    controller.usePlugin(new BotkitCMSHelper({
        uri: process.env.cms_uri,
        token: process.env.cms_token,
    }));
}
// once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(function () {
    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '\\features');
    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
        console.log("dfjhdskjfhds");
    }
});
//# sourceMappingURL=bot.js.map