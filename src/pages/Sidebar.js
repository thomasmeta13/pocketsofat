import React from 'react';

const Sidebar = ({ step }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px 20px',
      backgroundColor: '#2D2D2D',
      color: '#E0E0E0',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.5',
    }}>
      <h2 style={{ marginBottom: '30px', color: '#FF6347', borderBottom: '2px solid #FF6347' }}>Progress</h2>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #FF6347',
            borderRadius: '50%',
            marginRight: '10px',
            backgroundColor: step > 0 ? '#FF6347' : 'transparent',
          }} />
          <span style={{ fontWeight: step > 0 ? 'bold' : 'normal' }}>Connect Wallet</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #FF6347',
            borderRadius: '50%',
            marginRight: '10px',
            backgroundColor: step > 1 ? '#FF6347' : 'transparent',
          }} />
          <span style={{ fontWeight: step > 1 ? 'bold' : 'normal' }}>Credentials</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #FF6347',
            borderRadius: '50%',
            marginRight: '10px',
            backgroundColor: step > 2 ? '#FF6347' : 'transparent',
          }} />
          <span style={{ fontWeight: step > 2 ? 'bold' : 'normal' }}>Profilization</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #FF6347',
            borderRadius: '50%',
            marginRight: '10px',
            backgroundColor: step > 3 ? '#FF6347' : 'transparent',
          }} />
          <span style={{ fontWeight: step > 3 ? 'bold' : 'normal' }}>Chat</span>
        </div>
      </div>
      <p style={{ fontSize: '14px', color: '#6D6875' }}>© 2023 Your Company</p>
    </div>
  );
};

export default Sidebar;


