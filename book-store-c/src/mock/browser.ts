import { setupWorker } from "msw/browser";
import { addReview, reviewFormain, reviewsById } from "./review";
import { bestBooks } from "./books";
import { banners } from "./banner";

const handlers = [reviewsById, 
                    addReview, 
                    reviewFormain, 
                    bestBooks,
                    banners];

export const worker = setupWorker(...handlers);