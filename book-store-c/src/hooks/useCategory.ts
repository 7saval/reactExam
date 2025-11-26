import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";

export const useCategory = () =>{
    const [category, setCategory] = useState<Category[]>([]);
    
    // 첫 렌더링 시 카테고리 데이터 가져오기
    useEffect(() => {
        fetchCategory().then((category) => {

            if(!category) return;
            const categoryWithAll = [
                { category_id: null, category_name: "전체" },
                ...category,
            ];

            setCategory(categoryWithAll);
        });
    }, []);

    return { category };
}