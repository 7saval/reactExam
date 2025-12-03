import useToastStore from "@/store/toastStore";
import styled from "styled-components";
import Toast from "./Toast";

interface Props {

}

function ToastContainer(props: Props) {

    const toasts = useToastStore((state) => state.toasts);
    
  return (
    <ToastContainerStyle>
        {
            toasts.map((toast) => (
                <Toast 
                    key={toast.id} 
                    id={toast.id} 
                    type={toast.type} 
                    message={toast.message} 
                />
            ))
        }
    </ToastContainerStyle>
  );
}

const ToastContainerStyle = styled.div`
    position: fixed;
    top: 32px;
    right: 24px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export default ToastContainer;