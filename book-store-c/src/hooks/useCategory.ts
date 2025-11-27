import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useLocation } from "react-router-dom";

export const useCategory = () =>{
    const location = useLocation();
    const [category, setCategory] = useState<Category[]>([]);
    
    const setActive = () => {
        const params = new URLSearchParams(location.search);
        const categoryId = params.get("category_id");
        if(categoryId){
            setCategory((prev) => {
                return prev.map((item) => {
                    return { 
                        ...item, 
                        isActive: item.category_id === Number(categoryId)
                    };
                });
            });
        } else {
            // 전체일 경우 active 항상 false
            setCategory((prev) => {
                return prev.map((item) => {
                    return { 
                        ...item, 
                        isActive: false
                    };
                });
            });
        }
    }
    // 첫 렌더링 시 카테고리 데이터 가져오기
    useEffect(() => {
        fetchCategory().then((category) => {

            if(!category) return;
            const categoryWithAll = [
                { category_id: null, category_name: "전체" },
                ...category,
            ];

            setCategory(categoryWithAll);
            setActive();
        });
    }, []);

    useEffect(() => {
        setActive();
    }, [location.search]);

    return { category };
}