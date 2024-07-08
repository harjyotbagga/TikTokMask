import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface FullPageMaskProps {
  showMask: boolean;
  onClose: (value: boolean) => void;
  reason: string;
}

const FullPageMask: React.FC<FullPageMaskProps> = ({ showMask, onClose, reason }) => {
  const closeMask = () => {
    onClose(false);
  };
  const maskReasonMapping = {
    "politicalContent": "Political Content",
    "sexualityAndGenderIssues": "Sexuality And Gender Issues",
    "offensiveContent": "Offensive Content",
    "religiousContent": "Religious Content",
    "racialContent": "Racial Content",
    "hateSpeech": "Hate Speech",
  }
  const maskReason = maskReasonMapping[reason] || "Sensitive Content";
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
            backgroundColor: 'rgba(FFF1C1 0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              // backgroundColor: 'white',
              backgroundColor: '#FFF1C1',
              fontSize: '10px',
              padding: '20px', // Increased padding for a larger mask
              borderRadius: '12px', // Increased border radius for rounded corners
              textAlign: 'left',
              position: 'relative', // Ensure the button is positioned correctly within the container
              width: '20%', // Set a width for better visibility
              height: 'auto', // Set height to auto for dynamic content
            //   maxWidth: '600px', // Set a max width for the mask
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
              marginRight: '80px',
            }}
          >
            <p>🚨 Content Alert: {maskReason}<br /><br />

Based on your content preferences, we have identified that this post contains material related to <strong>{maskReason}</strong> which might be sensitive. TikTok is committed to providing a safe and inclusive platform for all users. We respect your preferences and are dedicated to ensuring that your viewing experience aligns with your personal choices.
<br /><br />
If you wish to continue, please be aware of the content's nature. If not, you have the option to skip this post.
<br /><br />
<span style={{color: 'blue'}}>Learn More</span> about how TikTok is taking care of your content preferences and promoting a respectful and mindful community.
<br /><br />
<strong><span style={{fontSize:'8px', lineHeight: '0.6em', }}>Your well-being matters to us. Thank you for helping us make TikTok a better place for everyone.</span></strong>
</p>
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
