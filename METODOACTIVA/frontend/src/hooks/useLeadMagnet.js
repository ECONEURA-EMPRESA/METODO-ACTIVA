import { useState } from 'react';
import { triggerConfetti } from '../utils/confetti';

export const useLeadMagnet = () => {
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);
    const [hasRegistered, setHasRegistered] = useState(false);

    const handleAccessRequest = () => {
        if (hasRegistered) {
            setShowContentModal(true);
        } else {
            setShowLeadModal(true);
        }
    };

    const handleLeadSuccess = () => {
        setHasRegistered(true);
        setShowLeadModal(false);
        setShowContentModal(true);
        triggerConfetti();
    };

    return {
        showLeadModal,
        setShowLeadModal,
        showContentModal,
        setShowContentModal,
        hasRegistered,
        handleAccessRequest,
        handleLeadSuccess
    };
};
