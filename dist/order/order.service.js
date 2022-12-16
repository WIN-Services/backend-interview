"use strict";
/**
 * Data Model Interfaces
 */
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
exports.remove = exports.update = exports.create = exports.find = exports.findAllServices = void 0;
const query_1 = require("../dbConfig/query");
/**
 * Order Methods
 */
const findAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield query_1.query("select * from orders", []);
    return data;
});
exports.findAllServices = findAllServices;
const find = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield query_1.query("select * from orders where order_id=$1 ", [id]);
});
exports.find = find;
const create = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("================================");
        const date = new Date();
        return yield query_1.query("INSERT INTO orders (services, total_fee, created_at, updated_at) values($1, $2, $3, $4)", [newItem.services, newItem.total_fee, date, date]);
    }
    catch (err) {
        return err;
    }
});
exports.create = create;
const update = (id, itemUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield exports.find(id);
    console.log(item, "====");
    return yield query_1.query("UPDATE orders SET services =$1, total_fee = $2 WHERE order_id=$3 ", [itemUpdate.services, itemUpdate.total_fee, id]);
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("============herer", id);
    return yield query_1.query("DELETE FROM orders WHERE order_id=$1 ", [id]);
});
exports.remove = remove;
//# sourceMappingURL=order.service.js.map