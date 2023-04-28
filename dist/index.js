"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const prUpdatedAction_1 = __importDefault(require("./actions/prUpdatedAction"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bucketPrefix = core.getInput("bucket-prefix");
        const folderToCopy = core.getInput("folder-to-copy");
        const environmentPrefix = core.getInput("environment-prefix");
        const prNumber = github.context.payload.pull_request.number;
        const bucketName = `${bucketPrefix}-pr${prNumber}`;
        console.log(`Bucket Name: ${bucketName}`);
        const githubActionType = github.context.payload.action;
        if (github.context.eventName === "pull_request") {
            switch (githubActionType) {
                case "opened":
                case "reopened":
                case "synchronize":
                    yield (0, prUpdatedAction_1.default)(bucketName, folderToCopy, environmentPrefix);
                    break;
                case "closed":
                    break;
                default:
                    console.log("PR not created, modified or deleted. Skiping...");
                    break;
            }
        }
        else {
            console.log("Not a PR. Skipping...");
        }
    }
    catch (error) {
        console.log(error);
        core.setFailed(error);
    }
});
main();
