import { userDetails } from "../../modals/user";
import { knex } from "../../config/dbconfig";
import { userCred } from "../../modals/loginModal";
import { userArray } from "../../constant/types";

export const createUser = async (userDetails: userDetails): Promise<any> => {
  await knex("users").insert({
    user_name: userDetails.userName,
    user_type: userDetails.userType,
    password: userDetails.password,
    email: userDetails.email
  });
};

export const getUser = async (userDetails: userCred): Promise<userArray[]> => {
    const res = await knex('users').where({
        user_name: userDetails.userName,
        password:  userDetails.password,
      })
     return res
  };
