// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createGroup } from '../../redux/groupsSlice';
// import './CreateGroup.css'; // Import the CSS file

// const CreateGroup = () => {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.groups);

//   const [groupName, setGroupName] = useState('');
//   const [emailIds, setEmailIds] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'groupName') {
//       setGroupName(value);
//     } else if (name === 'emailIds') {
//       setEmailIds(value);
//     }
//   };

//   const handleCreateGroup = () => {
//     const emailIdsArray = emailIds.split(',').map((email) => email.trim());
//     dispatch(createGroup({ groupName, emailIds: emailIdsArray }));
//     // console.log(groupName);     /////
//     // console.log(emailIdsArray); /////
//     // console.log(emailIds); /////
//     if(status==='succeeded'){
//       console.log("Group created successfully.")
//     }
//   };

//   return (
//     <div className="create-group-container">
//       <h2>Create Group</h2>
//       {status === 'failed' && <p className="error-message">Error: {error}</p>}
//       <form>
//         <div className="form-group">
//           <label>Group Name:</label>
//           <input
//             type="text"
//             name="groupName"
//             value={groupName}
//             onChange={handleInputChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label>Email IDs (comma-separated):</label>
//           <input
//             type="text"
//             name="emailIds"
//             value={emailIds}
//             onChange={handleInputChange}
//             className="form-input"
//           />
//         </div>
//         <button
//           type="button"
//           onClick={handleCreateGroup}
//           disabled={status === 'loading'}
//           className="create-group-btn"
//         >
//           Create Group
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateGroup;


//Version 2.0
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createGroup } from '../../redux/groupsSlice';
// import './CreateGroup.css'; // Import the CSS file

// const CreateGroup = () => {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.groups);

//   const [groupName, setGroupName] = useState('');
//   const [emailIds, setEmailIds] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleInputChange = (e) => {
//     setSuccessMessage(''); // Hide success message when user starts typing
//     const { name, value } = e.target;
//     if (name === 'groupName') {
//       setGroupName(value);
//     } else if (name === 'emailIds') {
//       setEmailIds(value);
//     }
//   };

//   const handleCreateGroup = () => {
//     const emailIdsArray = emailIds.split(',').map((email) => email.trim());
//     dispatch(createGroup({ groupName, emailIds: emailIdsArray }));
    
//     if (status === 'succeeded') {
//       setSuccessMessage('Group created successfully.');
//       console.log('Group created successfully.');   ////
//       // Reset input fields
//       setGroupName('');
//       setEmailIds('');
//     }
//   };

//   return (
//     <div className="create-group-container">
//       <h2>Create Group</h2>
//       {status === 'failed' && <p className="error-message">Error: {error}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <form>
//         <div className="form-group">
//           <label>Group Name:</label>
//           <input
//             type="text"
//             name="groupName"
//             value={groupName}
//             onChange={handleInputChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label>Email IDs (comma-separated):</label>
//           <input
//             type="text"
//             name="emailIds"
//             value={emailIds}
//             onChange={handleInputChange}
//             className="form-input"
//           />
//         </div>
//         <button
//           type="button"
//           onClick={handleCreateGroup}
//           disabled={status === 'loading'}
//           className="create-group-btn"
//         >
//           Create Group
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateGroup;


//Version 3.0
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createGroup } from '../../redux/groupsSlice';
// import './CreateGroup.css'; // Import the CSS file

// const CreateGroup = () => {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.groups);

//   const [groupName, setGroupName] = useState('');
//   const [emailIds, setEmailIds] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     if (status === 'succeeded') {
//       setSuccessMessage('Group created successfully.');
//       // Reset input fields
//       setGroupName('');
//       setEmailIds('');
//     } else if (status === 'failed') {
//       setSuccessMessage(''); // Clear success message on error
//     }
//   }, [status]);

//   const handleInputChange = (e) => {
//     setSuccessMessage(''); // Hide success message when user starts typing
//     const { name, value } = e.target;
//     if (name === 'groupName') {
//       setGroupName(value);
//     } else if (name === 'emailIds') {
//       setEmailIds(value);
//     }
//   };

//   const handleCreateGroup = () => {
//     const emailIdsArray = emailIds.split(',').map((email) => email.trim());
//     dispatch(createGroup({ groupName, emailIds: emailIdsArray }));
//   };

//   return (
//     <div className="create-group-container">
//       <h2>Create Group</h2>
//       {error && <p className="error-message">Error: {error}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <form>
//         <div className="form-group">
//           <label>Group Name:</label>
//           <input
//             type="text"
//             name="groupName"
//             value={groupName}
//             onChange={handleInputChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label>Email IDs (comma-separated):</label>
//           <input
//             type="text"
//             name="emailIds"
//             value={emailIds}
//             onChange={handleInputChange}
//             className="form-input"
//           />
//         </div>
//         <button
//           type="button"
//           onClick={handleCreateGroup}
//           disabled={status === 'loading'}
//           className="create-group-btn"
//         >
//           Create Group
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateGroup;


//version 4.0
// CreateGroup.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../redux/groupsSlice';
import './CreateGroup.css'; // Import the CSS file

const CreateGroup = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.groups);

  const [groupName, setGroupName] = useState('');
  const [emailIds, setEmailIds] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (status === 'succeeded') {
      setSuccessMessage('Group created successfully.');
      // Reset input fields
      setGroupName('');
      setEmailIds('');
    } else if (status === 'failed') {
      setSuccessMessage(''); // Clear success message on error
    }
  }, [status]);

  const handleInputChange = (e) => {
    setSuccessMessage(''); // Hide success message when user starts typing
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
  };

  return (
    <div className="create-group-container">
      <h2>Create Group</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form>
        <div className="form-group">
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={groupName}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailIds">Email IDs (comma-separated):</label>
          <input
            type="text"
            id="emailIds"
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
