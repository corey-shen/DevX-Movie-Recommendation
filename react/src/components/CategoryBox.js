import React from "react";

const CategoryBox = ({ icon: Icon, label, selected, onClick }) => {
  const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    borderBottom: '2px solid',
    borderBottomColor: selected ? '#1e40af' : 'transparent',
    color: selected ? '#1e40af' : '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out'
  };

  return (
    <div
      onClick={onClick}
      style={boxStyle}
      onMouseOver={(e) => e.currentTarget.style.color = '#1e40af'}
      onMouseOut={(e) => e.currentTarget.style.color = selected ? '#1e40af' : '#6b7280'}
    >
      <Icon size={30} />
      <div style={{ fontSize: '14px', fontWeight: '500' }}>{label}</div>
    </div>
  );
};

export default CategoryBox;