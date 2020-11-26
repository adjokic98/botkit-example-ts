import { Botkit } from 'botkit';
const { BotkitCMSHelper } = require('botkit-plugin-cms');
const fetch = require("node-fetch");
const express = require('express');
import * as path from 'path';
const { BotkitConversation } = require("botkit");
const { WebAdapter } = require('botbuilder-adapter-web');

const { MongoDbStorage } = require('botbuilder-storage-mongodb');

// load process.env values from .env file
require('dotenv').config();

let storage = null;
if (process.env.mongo_uri) {
	storage = new MongoDbStorage({
		url : process.env.mongo_uri,
	});
}

const adapter = new WebAdapter({});

const controller = new Botkit({ webhook_uri: '/api/messages', adapter: adapter});

if (process.env.cms_uri) {
	controller.usePlugin(new BotkitCMSHelper({
		uri: process.env.cms_uri,
		token: process.env.cms_token,
	}));
}

// once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '\\features');
    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
        console.log("dfjhdskjfhds");
    }

});