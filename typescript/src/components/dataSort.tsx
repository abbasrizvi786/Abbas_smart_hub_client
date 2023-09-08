import React, { useEffect, useState } from 'react';
import Data from './Data';

// Define the types for your data
interface CommunicationItem {
  timestamp: string;
  text: string;
}

interface UserData {
  customerName: string;
  customerCommunicationHistory: CommunicationItem[];
}

// Create a dictionary to group data by userId
const categorizeTimestamps = (communicationHistory: CommunicationItem[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayData: CommunicationItem[] = [];
  const yesterdayData: CommunicationItem[] = [];
  const otherData: CommunicationItem[] = [];

  communicationHistory.forEach((item) => {
    const itemDate = new Date(item.timestamp);

    if (
      itemDate.getDate() === today.getDate() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getFullYear() === today.getFullYear()
    ) {
      todayData.push(item);
    } else if (
      itemDate.getDate() === yesterday.getDate() &&
      itemDate.getMonth() === yesterday.getMonth() &&
      itemDate.getFullYear() === yesterday.getFullYear()
    ) {
      yesterdayData.push(item);
    } else {
      otherData.push(item);
    }
  });

  return {
    todayData,
    yesterdayData,
    otherData,
  };
};

const DataSort: React.FC = () => {
  return (
    <div className="App">
      {Data.map((user, index) => (
        <div key={index}>
          <h2>{user.customerName}</h2>
          <div>
            <h3>Today</h3>
            {categorizeTimestamps(user.customerCommunicationHistory).todayData.map(
              (item, i) => (
                <div style={{ border: "1px solid black", margin: "4px" }} key={i}>{item.text}</div>
              )
            )}
          </div>
          <div>
            <h3>Yesterday</h3>
            {categorizeTimestamps(user.customerCommunicationHistory).yesterdayData.map(
              (item, i) => (
                <div style={{ border: "1px solid black", margin: "4px" }} key={i}>{item.text}</div>
              )
            )}
          </div>
          <div>
            <h3>Other</h3>
            {categorizeTimestamps(user.customerCommunicationHistory).otherData.map(
              (item, i) => (
                <div style={{ border: "1px solid black", margin: "4px" }} key={i}>{item.text}</div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DataSort;
