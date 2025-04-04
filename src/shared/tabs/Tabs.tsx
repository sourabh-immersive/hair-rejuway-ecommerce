'use client'

import React, { useState } from "react";

interface TabData {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabData[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-6 py-2 rounded-full font-semibold ${
              activeTab === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;