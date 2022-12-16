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
 * Service Methods
 */
const findAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield query_1.query("select * from mst_service ", []);
    return data;
});
exports.findAllServices = findAllServices;
const find = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield query_1.query("select * from mst_service where id=$1 ", [id]);
});
exports.find = find;
const create = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("================================");
        return yield query_1.query("INSERT INTO mst_service (name, is_active) values($1, $2)", [newItem.name, newItem.is_active]);
    }
    catch (err) {
        return err;
    }
});
exports.create = create;
const update = (id, itemUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield exports.find(id);
    console.log(item, "====");
    return yield query_1.query("UPDATE mst_service SET name =$1 WHERE id=$2 ", [
        itemUpdate.name,
        id,
    ]);
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield query_1.query("DELETE FROM mst_service WHERE id=$1 ", [id]);
});
exports.remove = remove;
//# sourceMappingURL=services.service.js.map