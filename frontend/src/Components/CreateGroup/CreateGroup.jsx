import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../redux/groupsSlice';
// import { createGroup } from '../redux/groupsSlice';
import './CreateGroup.css'; // Import the CSS file

const CreateGroup = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.groups);

  const [groupName, setGroupName] = useState('');
  const [emailIds, setEmailIds] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'groupName') {
      setGroupName(value);
    } else if (name === 'emailIds') {
      setEmailIds(value);
    }
  };

  const handleCreateGroup = () => {
    const emailIdsArray = emailIds.split(',').map((email) => email.trim());
    dispatch(createGroup({ groupName, emailIds: emailIdsArray }));
    console.log(groupName);     /////
    console.log(emailIdsArray); /////
    console.log(emailIds); /////
  };

  return (
    <div className="create-group-container">
      <h2>Create Group</h2>
      {status === 'failed' && <p className="error-message">Error: {error}</p>}
      <form>
        <div className="form-group">
          <label>Group Name:</label>
          <input
            type="text"
            name="groupName"
            value={groupName}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email IDs (comma-separated):</label>
          <input
            type="text"
            name="emailIds"
            value={emailIds}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateGroup}
          disabled={status === 'loading'}
          className="create-group-btn"
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
