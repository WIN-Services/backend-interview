import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const ORDER_COOL_DOWN_TIME = 3 * 60 * 60 * 1000; // 3hrs in milliseconds
