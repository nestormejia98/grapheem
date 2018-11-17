import React from 'react';
import './DiagramButtons.css';

const DiagramButton = ({ onInit, onUpdateColor, onAddNode }) => {
    return (
        <div className="centered-container">
            <div className="inline-element">
                <button type="button" onClick={onInit}>
                    Init diagram
                </button>
            </div>
        </div>
    );
};

export default DiagramButton;
