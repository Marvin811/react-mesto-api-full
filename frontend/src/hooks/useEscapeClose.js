import React from "react";

function useEscapeClose(isOpen, onClose) {
    React.useEffect(() => {
        if (!isOpen) return
        const handleEscClose = (evt) => {
            if (evt.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscClose)
        return () => document.removeEventListener('keydown', handleEscClose)
    }, [isOpen, onClose])
}

export default useEscapeClose;
