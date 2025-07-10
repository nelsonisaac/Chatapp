import React from 'react';
import '../styles.css';
import ListSegment from '../Components/ListSegment';
import ChatBox from '../Components/ChatBox';

const Dashboard = () => {

  let username = localStorage.getItem('username') || 'Guest';
  return (
    <div
      className="vh-100"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
    <h4 className='text-center' >Welcome {username}</h4>
      {/* <div className="ChatListBox">
        <ListSegment />
      </div> */}
      <div className="ChatBox">
        <ChatBox />
      </div>
    </div>
  );
};

export default Dashboard;
