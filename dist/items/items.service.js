"use strict";
// src/items/items.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.find = exports.findAll = void 0;
const query_1 = require("../dbConfig/query");
let items = {
    1: {
        id: 1,
        name: "Burger",
        price: 599,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        price: 299,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    3: {
        id: 3,
        name: "Tea",
        price: 199,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
};
/**
 * Service Methods
 */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield query_1.query("select * from orders ", []);
    return data;
});
exports.findAll = findAll;
const find = (id) => __awaiter(void 0, void 0, void 0, function* () { return items[id]; });
exports.find = find;
const create = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new Date().valueOf();
    items[id] = Object.assign({ id }, newItem);
    return items[id];
});
exports.create = create;
const update = (id, itemUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield exports.find(id);
    if (!item) {
        return null;
    }
    items[id] = Object.assign({ id }, itemUpdate);
    return items[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield exports.find(id);
    if (!item) {
        return null;
    }
    delete items[id];
});
exports.remove = remove;
//# sourceMappingURL=items.service.js.map