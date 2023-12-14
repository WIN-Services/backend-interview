import { userArray } from "../../constant/types";
import { userCred } from "../../modals/loginModal";
import { userDetails } from "../../modals/user";
import { createUser, getUser } from "../../store/user/userStore";

export const create = async (userDetails: userDetails): Promise<any> => {
    await createUser(userDetails);
  };

  export const get = async (userDetails: userCred): Promise<userArray[]> => {
    const res = await getUser(userDetails);
    return res
  };
