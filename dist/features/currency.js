"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var botkit_1 = require("botkit");
var axios = require('axios');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var currencies = ["bam", "eur", "usd", "rsd"];
var dict = {
    "km": "bam",
    "din": "rsd",
    "euros": "eur"
};
module.exports = function (controller) {
    var _this = this;
    var missing1currency = new botkit_1.BotkitConversation('mc1', controller);
    missing1currency.ask('Could u provide the other currency please?', [], 'onecur');
    controller.addDialog(missing1currency);
    controller.afterDialog(missing1currency, function (bot, results) { return __awaiter(_this, void 0, void 0, function () {
        var key, result, res, date;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("IN DIALOG 1");
                    console.log("from ", from);
                    to = results.onecur;
                    for (key in dict) {
                        if (to.includes(key)) {
                            to = to.replace(key, dict[key]);
                        }
                    }
                    console.log("amount from to ", amount, from, to);
                    return [4 /*yield*/, convert(amount, from, to)];
                case 1:
                    result = _a.sent();
                    res = result.result.value;
                    date = result.result.date;
                    bot.say("The result of converting  for date " + date + " - " + amount + from.toUpperCase() + " is " + res + to.toUpperCase());
                    return [2 /*return*/];
            }
        });
    }); });
    var missing2currency = new botkit_1.BotkitConversation('mc2', controller);
    missing2currency.ask('Provide both currencies please separated by a space.', [], 'twocur');
    controller.addDialog(missing2currency);
    controller.afterDialog(missing2currency, function (bot, results) { return __awaiter(_this, void 0, void 0, function () {
        var words, key, result, res, date;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    words = results.twocur.split(" ");
                    words.filter(Boolean);
                    for (key in dict) {
                        if (from.includes(key)) {
                            from = from.replace(key, dict[key]);
                        }
                        if (to.includes(key)) {
                            to = to.replace(key, dict[key]);
                        }
                    }
                    from = words[0];
                    to = words[1];
                    return [4 /*yield*/, convert(amount, from, to)];
                case 1:
                    result = _a.sent();
                    res = result.result.value;
                    date = result.result.date;
                    bot.say("The result of converting for date " + date + " - " + amount + from.toUpperCase() + " is " + res + to.toUpperCase());
                    return [2 /*return*/];
            }
        });
    }); });
    controller.hears([new RegExp("/^\d*\.?\d*/"), new RegExp(currencies.join("|")), new RegExp(Object.keys(dict).join("|"))], 'message', function (bot, message) { return __awaiter(_this, void 0, void 0, function () {
        var matched, amount, key, words, numofcurs, adx, toIndex, result, res, date;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastmsg = message["text"];
                    matched = lastmsg.match(new RegExp(/[0-9]+([,.][0-9]+)?/g));
                    amount = (matched === null || matched === void 0 ? void 0 : matched.length) ? matched[0] : "20";
                    // convert 20 eur to usd
                    for (key in dict) {
                        if (lastmsg.includes(key)) {
                            lastmsg = lastmsg.replace(key, dict[key]);
                        }
                    }
                    words = lastmsg.split(" ");
                    words.filter(Boolean);
                    numofcurs = lastmsg.split(new RegExp(currencies.join("|"))).length - 1;
                    console.log(words);
                    adx = words.indexOf(amount);
                    if (!(numofcurs == 0)) return [3 /*break*/, 1];
                    bot.beginDialog('mc2');
                    return [3 /*break*/, 5];
                case 1:
                    if (!(numofcurs == 1)) return [3 /*break*/, 2];
                    from = words[adx + 1];
                    bot.beginDialog('mc1');
                    return [3 /*break*/, 5];
                case 2:
                    if (!(numofcurs == 2)) return [3 /*break*/, 4];
                    from = words[adx + 1];
                    toIndex = words.indexOf("to");
                    to = words[toIndex + 1];
                    return [4 /*yield*/, convert(amount, from, to)];
                case 3:
                    result = _a.sent();
                    res = result.result.value;
                    date = result.result.date;
                    bot.say("The result of converting for date " + date + " - " + amount + from.toUpperCase() + " is " + res + to.toUpperCase());
                    return [3 /*break*/, 5];
                case 4:
                    bot.say("Please provide only two currencies!");
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
function convert(amount, from, to) {
    return __awaiter(this, void 0, void 0, function () {
        var api, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = "http://api.kursna-lista.info/0d736aaa85c9de8a92e9619e2fbec25d/konvertor/" + from + "/" + to + "/" + amount;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(api)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=currency.js.map