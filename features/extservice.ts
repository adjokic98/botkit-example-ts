var axios = require('axios');
  
import { Botkit } from 'botkit';
 
module.exports = function(controller: Botkit) {

    controller.hears(new RegExp(/Find .+ using wa/i), 'message', async(bot, message) => {
        var query = message.matches[0];
        var words = query.split(" ");
        console.log(query);
        console.log(words);
        query="";
        for (var i = 1; i < words.length-2; i++) {
            query += words[i]+"%20";
        }
        var api = 'https://api.wolframalpha.com/v1/simple?appid=8P2VGJ-RJV8VV4PXP&i='+query+'&format=image&output=image';
        //api ok napisan
        
        var reply = {};
        try {
            await axios.get(api)
            .then(response =>{
                if (response.status == 200) {
                    reply = {
                        text: '',
                        files: [{
                            url: api,
                            image: true
                        }]
                    }
                } else {
                    reply = {text:'Error!'}
                }
                
            })
            .catch(function (error) {
                
                    reply = {text: 'Error, try another keyword'}
                
            });
        } catch (error) {
            console.log(error);
        }
        await bot.reply(message, reply);
    });
}