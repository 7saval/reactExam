import { Category } from "../models/category.model";
import { httpClient } from "./http";

export const fetchCategory = async () => {
    const response = await httpClient.get<Category[]>("/category"); // 모델 타입
    return response.data;
}