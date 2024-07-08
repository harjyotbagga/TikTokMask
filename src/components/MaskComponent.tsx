import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface FullPageMaskProps {
  showMask: boolean;
  onClose: (value: boolean) => void;
}

const FullPageMask: React.FC<FullPageMaskProps> = ({ showMask, onClose }) => {
  const closeMask = () => {
    onClose(false);
  };

  return (
    <>
      {showMask && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '40px', // Increased padding for a larger mask
              borderRadius: '12px', // Increased border radius for rounded corners
              textAlign: 'center',
              position: 'relative', // Ensure the button is positioned correctly within the container
            //   width: '80%', // Set a width for better visibility
            //   maxWidth: '600px', // Set a max width for the mask
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
            }}
          >
            <p style={{ marginBottom: '20px' }}>Post Masked</p>
            <button
              onClick={closeMask}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FullPageMask;
