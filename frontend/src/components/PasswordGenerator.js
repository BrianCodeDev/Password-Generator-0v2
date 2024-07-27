import React, { useState, useEffect } from 'react';
import '../App.css'; // Import the CSS file
import plusbutton from '../assets/images/plusbutton.svg'; // Import the image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHouse, faUser, faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/dots.svg'; // Import the image

const PasswordGenerator = () => {
  const [passwordsList, setPasswordsList] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState(['Facebook', 'Amazon', 'Discord', 'Google', 'Apple']);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      fetchPasswords(); // Fetch passwords from local storage
    }
  }, []);

  const fetchPasswords = () => {
    const savedPasswords = JSON.parse(localStorage.getItem('passwordsList')) || {};
    setPasswordsList(savedPasswords);
  };

  const generatePassword = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handlePasswordClick = (company) => {
    if (isAuthenticated) {
      const newPassword = generatePassword(12);
      const updatedPasswordsList = { ...passwordsList, [company]: newPassword };
      setPasswordsList(updatedPasswordsList);
      localStorage.setItem('passwordsList', JSON.stringify(updatedPasswordsList));
      setModalVisible(false); // Close the modal after selection
    }
  };

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddCompany = () => {
    const newCompany = prompt('Enter the name of the new company:');
    if (newCompany && !companies.includes(newCompany)) {
      setCompanies([...companies, newCompany]);
    }
  };

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setNotification('Password copied to clipboard!');
        setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
      })
      .catch(err => console.error('Failed to copy password:', err));
  };

  const filteredCompanies = companies.filter(company =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="password-gen">
      <img src={logo} className="logo-register" alt="Logo" style={{ width: '40px', height: 'auto' }} />
      <div className="box-container">
        <div className="box">
          <div><h1>{Object.keys(passwordsList).length}</h1></div>
          <div><h2>Passwords Stored</h2></div>
        </div>
        <div className="box"></div>
      </div>
      <div className={'input-center'}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          className={'search-box'}
          placeholder={'Search Websites...'}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <CompanyList
        passwordsList={passwordsList}
        onPasswordClick={handlePasswordClick}
        companies={filteredCompanies}
        onCopyPassword={handleCopyPassword}
      />

      <div className={'footer-bottom'}>
        <div className='content-one-footer'>
          <footer>
            <div className='content-footer'>
              <div>
                <FontAwesomeIcon icon={faHouse} className='fahouse' />
              </div>
              <div className={'plusbutton-footer'}>
                <a href="#" onClick={handleModalToggle}>
                  <img src={plusbutton} className="plusbutton" alt="plusbutton" style={{ width: '60px', height: 'auto' }} />
                </a>
              </div>
              <div>
                <FontAwesomeIcon icon={faUser} className='fauser' />
              </div>
            </div>
          </footer>
        </div>
      </div>

      {modalVisible && (
        <Modal
          onClose={handleModalToggle}
          onSelect={handlePasswordClick}
          companies={filteredCompanies}
          onAddCompany={handleAddCompany}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      )}

      {notification && (
        <div className="notification">{notification}</div>
      )}
    </div>
  );
};

const CompanyList = ({ passwordsList, onPasswordClick, companies, onCopyPassword }) => {
  return (
    <div className="company-list">
      <h3>Company List</h3>
      <ul>
        {companies.map((company, index) => (
          <div key={index} className='display-list'>
            <div>
              <li className='company-name' onClick={() => onPasswordClick(company)}>{company}</li>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faCopy}
                className='facopy'
                onClick={() => onCopyPassword(passwordsList[company])}
              />
              <span>{passwordsList[company]}</span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

const Modal = ({ onClose, onSelect, companies, onAddCompany, searchTerm, onSearchChange }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FontAwesomeIcon icon={faTimes} className="modal-close" onClick={onClose} />
        <h3>Select or Add a Company</h3>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={onSearchChange}
          className="modal-search-box"
        />
        <div className="modal-items">
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <div key={index} className="modal-item" onClick={() => onSelect(company)}>
                {company}
              </div>
            ))
          ) : (
            <p>No companies found</p>
          )}
        </div>
        <button onClick={onAddCompany} className="modal-add-button">Add Company</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
