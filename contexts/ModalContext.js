import { createContext, useState, useContext } from 'react';

// Créer le contexte
export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);
    const [isModalSignUpVisible, setIsModalSignUpVisible] = useState(false);

    // Fonctions pour montrer/fermer les modals
    const showModalSignIn = () => {
        setIsModalSignInVisible(true);
        setIsModalSignUpVisible(false);
    };

    const hideModalSignIn = () => {
        setIsModalSignInVisible(false);
    };

    const showModalSignUp = () => {
        setIsModalSignUpVisible(true);
        setIsModalSignInVisible(false);
    };

    const hideModalSignUp = () => {
        setIsModalSignUpVisible(false);
    };

    return (
        <ModalContext.Provider value={{
            isModalSignInVisible,
            showModalSignIn,
            hideModalSignIn,
            isModalSignUpVisible,
            showModalSignUp,
            hideModalSignUp,
        }}>
            {children}
        </ModalContext.Provider>
    );
};

// Hook personnalisé pour accéder facilement au contexte
export const useModal = () => {
    return useContext(ModalContext);
};
