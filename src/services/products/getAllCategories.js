import { axiosInstance } from "../../api/axiosInstance";

export const getAllCategories = async () => {
  try {
    const res = await axiosInstance.get("categories");

    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    else throw new Error("Error con la peticion de categorias");
  }
};