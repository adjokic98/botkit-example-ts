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
var path = __importStar(require("path"));
var BotkitConversation = require("botkit").BotkitConversation;
module.exports = function (controller) {
    var _this = this;
    controller.publicFolder('/', path.join(__dirname, '..', 'public'));
    console.log('Chat with me: http://localhost:' + (process.env.PORT || 3000));
    var planner = new BotkitConversation('planner', controller);
    planner.ask('What are your plans from 9 to 12?', [], 'morning');
    planner.ask('What are your plans from 12 to 15?', [], 'noon');
    planner.ask('What are your plans from 15 to 18?', [], 'afternoon');
    planner.ask('What are your plans from 18 to 21?', [], 'evening');
    var dict = {};
    controller.addDialog(planner);
    controller.afterDialog(planner, function (bot, results) { return __awaiter(_this, void 0, void 0, function () {
        var texttosend, k;
        return __generator(this, function (_a) {
            if (!results.morning.includes("nothing")) {
                dict['9 to 12'] = results.morning;
            }
            ;
            if (!results.noon.includes("nothing")) {
                dict["12 to 15"] = results.noon;
            }
            ;
            if (!results.afternoon.includes("nothing")) {
                dict["15 to 18"] = results.afternoon;
            }
            ;
            if (!results.evening.includes("nothing")) {
                dict["18 to 21"] = results.evening;
            }
            ;
            texttosend = "";
            console.log(dict);
            for (k in dict) {
                texttosend += k + " - " + dict[k] + "\n";
            }
            bot.say("Your plans for today are: \n" + texttosend);
            return [2 /*return*/];
        });
    }); });
    controller.hears('plan', 'message', function (bot, message) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bot.beginDialog('planner')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    controller.on('hello', function (bot, message) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bot.say('Hi, if you need help, type \"-help\"!')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    controller.hears('-help', 'message', function (bot, message) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bot.say("If you want the bot to ask you about plans in your day, tell him anything including the word \"plan\" <br> If you want information about anything, tell the bot \"find _____ using wa\" .<br> If you want to convert between currencies, include the amount and starting and ending currency. <br> We currently support only BAM, RSD, USD and EUR.")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
};
//# sourceMappingURL=index.js.map