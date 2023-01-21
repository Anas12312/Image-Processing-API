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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var cloneImage_1 = __importDefault(require("./utilities/cloneImage"));
// Express Server Configuration to Run on Port 3000
var app = (0, express_1.default)();
var port = 3000;
// The GET Endpoint for resizing/viewing Images
app.get('/api/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, width, height, thumbPath, fullPath, status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filename = req.query.filename;
                width = req.query.width;
                height = req.query.height;
                // Checks For any Parameter Missing
                if (!filename || !width || !height) {
                    res.status(400).send('Please Select an Image\'s Name, Width and Height!');
                    return [2 /*return*/];
                }
                thumbPath = path_1.default.join(__dirname, '../images/thumb', filename + width + height + '.jpg');
                if (!fs_1.default.existsSync(thumbPath)) return [3 /*break*/, 1];
                res.sendFile(thumbPath); // Sending the Image if Exists
                return [3 /*break*/, 4];
            case 1:
                fullPath = path_1.default.join(__dirname, '../images/full', filename + '.jpg');
                if (!fs_1.default.existsSync(fullPath)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, cloneImage_1.default)(filename, width, height)];
            case 2:
                status = _a.sent();
                // Checks wether the operation Succeded or Not
                if (status) {
                    // Sending the Resized Image
                    res.sendFile(thumbPath);
                }
                else {
                    res.status(400).send('An Error has Occured!');
                }
                return [3 /*break*/, 4];
            case 3:
                res.status(404).send('This Image Doesn\'t Exist!');
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
// Starting the Server
app.listen(port, function () {
    console.log("Server started at localhost:".concat(port));
});
exports.default = app;
