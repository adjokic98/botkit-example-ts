const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');
const { WebAdapter } = require('botbuilder-adapter-web');
const { MongoDbStorage } = require('botbuilder-storage-mongodb');
const fetch = require("node-fetch");
import * as path from 'path';
const express = require('express');
const { BotkitConversation } = require("botkit");
// load process.env values from .env file
require('dotenv').config();

let storage = null;
if (process.env.mongo_uri) {
	storage = new MongoDbStorage({
		url : process.env.mongo_uri,
	});
}
const adapter = new WebAdapter({});
const controller = new Botkit({
    webhook_uri: '/api/messages',

    adapter: adapter,

    storage
});

if (process.env.CMS_URI) {
    controller.usePlugin(new BotkitCMSHelper({
        uri: process.env.CMS_URI,
        token: process.env.CMS_TOKEN,
    }));
}
// once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
	console.log("ready");
    // load traditional developer-created local custom feature modules
    const index = path.join(__dirname, 'features');
    controller.loadModules(index);
    /* catch-all that uses the CMS to trigger dialogs */

});