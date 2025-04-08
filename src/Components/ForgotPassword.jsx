import React, { useState } from 'react';
import userPool from '../services/cognito/Userpool';
import {
  CognitoUserPool,
  CognitoUser
} from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import Navi from './Navi';





const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate=useNavigate()

  const handleForgotPassword = () => {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        console.log('Code sent successfully:', data);
        setCodeSent(true);
        setMessage('Verification code sent to your email/phone.');
      },
      onFailure: (err) => {
        console.error(err);
        setMessage(err.message || 'Something went wrong');
      },
    });
  };

  const handleConfirmPassword = () => {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        setMessage('Password reset successfully!');
        navigate("/login")
        
      },
      onFailure: (err) => {
        console.error(err);
        setMessage(err.message || 'Password reset failed');
      },
    });
  };

  return (
   <>
   <Navi/>
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Forgot Password</h2>
      <div>
        <input
          type="text"
          placeholder="Username / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        {!codeSent ? (
          <button onClick={handleForgotPassword}>Send Verification Code</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <button onClick={handleConfirmPassword}>Reset Password</button>
          </>
        )}
        {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
      </div>
    </div>
   </>
  );
};

export default ForgotPassword;
