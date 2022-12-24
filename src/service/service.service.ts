import { getTimeDiff } from "../../utils/getTimeDifference";
import serviceModel from "./service.model";

export const addServiceService = async (payload: { name: string }) => {
  try {
    const data = await serviceModel.find();
    if (data.length > 0) {
      if(getTimeDiff(data[data.length - 1].updatedAt).hours <= 3  ){
        throw new Error("user only add order within 3 hrs of a pre-existing order");
      }
    }
    return await serviceModel.create(payload);
  } catch (err) {
    throw err;
    console.log(err);
  }
};

export const getServiceService = async (query: object) => {
  return await serviceModel.find(query);
};

export const removeServiceService = async (id: string) => {
  try {
    const data = await serviceModel.findByIdAndDelete(id);

    if (!data) {
      throw new Error("data not found");
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateServiceService = async (
  id: string,
  payload: { name: string }
) => {
  try {
    const data = await serviceModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!data) {
      throw new Error("data not found");
    }
    return data;
  } catch (err) {
    throw err;
  }
};
