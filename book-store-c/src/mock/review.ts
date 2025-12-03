import { BookReviewItem } from '@/models/book.model';
import { http, HttpResponse } from 'msw';
import { fakerKO as faker } from '@faker-js/faker';


// const mockReviewsData:BookReviewItem[] = [
//     {
//         id: 1,
//         userName: "홍길동",
//         content: "좋아요",
//         createdAt: "2025-01-01",
//         score: 5,
//     },
//     {
//         id: 2,
//         userName: "김길동",
//         content: "좋아요2",
//         createdAt: "2025-01-01",
//         score: 3,
//     },
// ]; 

const mockReviewsData:BookReviewItem[] = Array.from({length:8}).map((_, index) => (
    {
        id: index,
        userName: `${faker.person.lastName()}${faker.person.firstName()}`,
        content: faker.lorem.paragraph(),
        createdAt: faker.date.past().toISOString(),
        score: faker.number.int({min:1, max:5}),
    }
));

// 리뷰 조회
export const reviewsById = http.get('http://localhost:9999/reviews/:bookId', 
    () => {
    
    return HttpResponse.json(mockReviewsData, {
        status: 200
    })
});

// 리뷰 작성
export const addReview = http.post('http://localhost:9999/reviews/:bookId',
    () => {
        return HttpResponse.json({
            message: "리뷰가 등록되었습니다."
        },
        {
            status: 200
        })
    }
)