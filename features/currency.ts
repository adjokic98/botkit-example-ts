import { BotkitConversation } from 'botkit';
var axios = require('axios');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var currencies = ["bam","eur","usd","rsd"];
var dict = {
	"km" : "bam",
	"din": "rsd",
	"euros": "eur"
};
declare var lastmsg: string;
declare var amount: any;
declare var from: string;
declare var to: string;

module.exports = function(controller:any) {
	const missing1currency = new BotkitConversation('mc1', controller);
	missing1currency.ask('Could u provide the other currency please?', [], 'onecur');
	controller.addDialog(missing1currency);
	controller.afterDialog(missing1currency, async(bot:any, results:any) => {
		console.log("IN DIALOG 1");
		console.log("from ", from);
		
		to = results.onecur;
		for (var key in dict) {
			if (to.includes(key)){
				to = to.replace(key, dict[key]);
			}
		}
		console.log("amount from to ", amount, from, to );

		var result = await convert(amount, from, to);
		var res = result.result.value;
		var date = result.result.date;
		bot.say("The result of converting  for date " + date + " - " + amount + from.toUpperCase() + " is " + res + to.toUpperCase());
	});

	const missing2currency = new BotkitConversation('mc2', controller);
	missing2currency.ask('Provide both currencies please separated by a space.', [], 'twocur');
	controller.addDialog(missing2currency);
	controller.afterDialog(missing2currency, async(bot:any, results:any) => {
		var words = results.twocur.split(" ");
		words.filter(Boolean);
		for (var key in dict) {
			if (from.includes(key)){
				from = from.replace(key, dict[key]);
			}
			if (to.includes(key)){
				to = to.replace(key, dict[key]);
			}
		}
		from = words[0];
		to = words[1];
		var result = await convert(amount, from, to);
		var res = result.result.value;
		var date = result.result.date;
		bot.say("The result of converting for date " + date + " - " + amount + from.toUpperCase() + " is " + res + to.toUpperCase());
	});

	controller.hears([new RegExp("/^\d*\.?\d*/"), new RegExp(currencies.join("|")), new RegExp(Object.keys(dict).join("|"))],'message', async (bot, message) => {
		lastmsg = message["text"];
		let matched = lastmsg.match(new RegExp(/[0-9]+([,.][0-9]+)?/g));
		const amount = matched?.length ? matched[0] : "20";
		// convert 20 eur to usd
		for (var key in dict) {
			if (lastmsg.includes(key)){
				lastmsg = lastmsg.replace(key, dict[key]);
			}
		}
		var words = lastmsg.split(" ");
		words.filter(Boolean);

		var numofcurs = lastmsg.split(new RegExp(currencies.join("|"))).length - 1;
		console.log(words);
		var adx = words.indexOf(amount)
		// amount ok
		if (numofcurs == 0) {
			bot.beginDialog('mc2');
		} else if (numofcurs == 1) {
			from = words[adx+1];
			bot.beginDialog('mc1');
		} else if (numofcurs == 2) {
			from = words[adx+1];
			var toIndex = words.indexOf("to")
			to = words[toIndex+1];
			var result = await convert(amount, from, to);
			var res = result.result.value;
			var date = result.result.date;
			bot.say("The result of converting for date " + date + " - " + amount + from.toUpperCase() + " is " + res + to.toUpperCase());
		} else {
			bot.say("Please provide only two currencies!");
		}
	});
}
async function convert(amount:string, from:string, to:string){
	var api = "http://api.kursna-lista.info/0d736aaa85c9de8a92e9619e2fbec25d/konvertor/"+from+"/"+to+"/"+amount;

	try {
		let response = await fetch(api);
		let data = await response.json()
		return data;
	} catch (error) {
		console.error(error);
	}
}