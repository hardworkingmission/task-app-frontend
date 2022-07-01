import React from 'react';

const Footer = () => {
  return (
    <div className="w-5/6 mx-auto bg-gray-100  absolute bottom-0 right-0 left-0 py-5">
      <h3>Copyright &copy; {new Date().getFullYear()} taskapp.com</h3>
    </div>
  );
};

export default Footer;
