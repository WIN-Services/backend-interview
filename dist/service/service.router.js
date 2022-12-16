"use strict";
/**
 * Required External Modules and Interfaces
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express_1 = __importDefault(require("express"));
const appService = __importStar(require("./services.service"));
/**
 * Router Definition
 */
exports.serviceRouter = express_1.default.Router();
/**
 * Controller Definitions
 */
// GET services
exports.serviceRouter.get("/services", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield appService.findAllServices();
        res.status(200).json({ success: true, data: items });
    }
    catch (e) {
        res.status(500).json({ success: false, data: e.message });
    }
}));
// GET services/:id
exports.serviceRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const item = yield appService.find(id);
        if (item) {
            return res.status(200).json({ success: true, data: item });
        }
        res.status(404).json({ success: true, data: "item not found" });
    }
    catch (e) {
        res.status(500).json({ success: false, data: e.message });
    }
}));
// POST services
exports.serviceRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = req.body;
        const newItem = yield appService.create(item);
        res.status(201).json({ success: true, data: newItem });
    }
    catch (e) {
        res.status(500).json({ success: false, data: e.message });
    }
}));
// PUT services/:id
exports.serviceRouter.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const itemUpdate = req.body;
        const existingItem = yield appService.find(id);
        if (existingItem) {
            const updatedItem = yield appService.update(id, itemUpdate);
            return res.status(200).json(updatedItem);
        }
        const newItem = yield appService.create(itemUpdate);
        res.status(201).json(newItem);
    }
    catch (e) {
        res.status(500).json({ success: false, data: e.message });
    }
}));
// DELETE services/:id
exports.serviceRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const existingItem = yield appService.find(id);
        console.log("=============", id, existingItem);
        if (existingItem) {
            const deletedItem = yield appService.remove(id);
            return res.status(200).json({ success: true, data: deletedItem });
        }
        res.sendStatus(204).json({ success: true, data: [] });
    }
    catch (e) {
        res.status(500).json({ success: false, data: e.message });
    }
}));
//# sourceMappingURL=service.router.js.map