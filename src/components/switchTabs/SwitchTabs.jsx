import React, { useState } from "react";
import "./SwitchTabs.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      // this timeout will wait to switch tab 3 section beacuse transition is 0.3sec
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs__container">
      <div className="switchingTabs__items">
        {data.map((tab, index) => (
          <span
            onClick={() => {
              return activeTab(tab, index);
            }}
            key={index}
            className={`switchingTabs__item ${
              selectedTab === index ? "active" : ""
            }`}
          >
            {tab}
          </span>
        ))}
        <span className="swtichingTabs__movingBg" style={{ left: left }}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
