import React, { useEffect } from 'react';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface SuccessScreenProps {
  onBackToHome: () => void;
  submissionId: string | null;
  phoneNumber: string;
}

const formatPhoneNumberForWebhook = (phone: string): string => {
  // Remove spaces, dashes, and parentheses for easier processing
  const cleaned = phone.replace(/[\s-()]/g, '');

  if (cleaned.startsWith('+62')) {
    // Replace '+62' with '62'
    return cleaned.substring(1);
  } else if (cleaned.startsWith('0')) {
    // Replace leading '0' with '62'
    return '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('62')) {
    // Already in a good format
    return cleaned;
  } else {
    // Prepend '62' if no recognized prefix is found
    return '62' + cleaned;
  }
};


const SuccessScreen: React.FC<SuccessScreenProps> = ({ onBackToHome, submissionId, phoneNumber }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (submissionId && phoneNumber) {
        const formattedPhoneNumber = formatPhoneNumberForWebhook(phoneNumber);
        console.log(`Webhook triggered for submission: ${submissionId} with phone: ${formattedPhoneNumber}`);
        
        const webhookUrl = 'https://n8n-trvrrtyf.n8x.biz.id/webhook/midi-kriing';
        const payload = {
          submission_id: submissionId,
          phone_number: formattedPhoneNumber,
        };

        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(response => {
          if (!response.ok) {
            // Log error but don't bother the user, it's a background task
            console.error(`Webhook failed with status: ${response.status}`);
          } else {
            console.log('Webhook call successful.');
          }
        })
        .catch(error => {
          console.error('Error calling webhook:', error);
        });
      }
    }, 5000); // 5-second delay

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [submissionId, phoneNumber]);

  return (
    <div className="flex flex-col h-full bg-white text-center justify-between p-6">
      <div className="flex-grow flex flex-col items-center justify-center">
        <CheckCircleIcon className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Setup Complete!
        </h1>
        <p className="text-gray-500 max-w-sm mx-auto">
          Your reminder preferences have been saved successfully. We'll keep you updated based on your settings.
        </p>
      </div>
      <div className="w-full">
        <button
          onClick={onBackToHome}
          className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
