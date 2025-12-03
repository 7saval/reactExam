import { create } from "zustand";

export type toastType = 'info' | 'error';

export interface ToastItem {
    id: number;
    message: string;
    type: toastType;
}

interface ToastStoreState {
    toasts: ToastItem[];
    addToast: (message: string, type?: toastType) => void;
    removeToast: (id: number) => void;
}
const useToastStore = create<ToastStoreState>((set) => ({
    toasts: [],
    addToast: (message, type = 'info') => {
        set((state) => ({
            toasts: [...state.toasts, {
                id: Date.now(),
                message,
                type
            }]
        }))
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id)
        }))
    }

}));

export default useToastStore;