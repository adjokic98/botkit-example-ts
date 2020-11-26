import * as path from 'path';
import { Botkit } from 'botkit';
const { BotkitConversation } = require("botkit");

module.exports = function(controller:Botkit) {
    controller.publicFolder('/', path.join(__dirname,'..','public'));
    console.log('Chat with me: http://localhost:' + (process.env.PORT || 3000));

    const planner = new BotkitConversation('planner', controller);
    planner.ask('What are your plans from 9 to 12?', [], 'morning');
    planner.ask('What are your plans from 12 to 15?', [], 'noon');
    planner.ask('What are your plans from 15 to 18?', [], 'afternoon');
    planner.ask('What are your plans from 18 to 21?', [], 'evening');

    var dict = {};    
    controller.addDialog(planner);
    controller.afterDialog(planner, async(bot, results) => {

        if (!results.morning.includes("nothing")){
            dict['9 to 12'] = results.morning;
        };
        if (!results.noon.includes("nothing")){
            dict["12 to 15"] = results.noon;
        };
        if (!results.afternoon.includes("nothing")){
            dict["15 to 18"] = results.afternoon;
        };
        if (!results.evening.includes("nothing")){
            dict["18 to 21"] = results.evening;
        };
        var texttosend = "";
        console.log(dict);

        for (var k in dict){
            texttosend+= k + " - " + dict[k] + "\n";
        }
        bot.say("Your plans for today are: \n" + texttosend)
    });
    controller.hears('plan','message', async (bot, message) => {
        await bot.beginDialog('planner');
    });
}