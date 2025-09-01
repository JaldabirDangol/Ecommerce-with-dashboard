"use client";

import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface RecentActivityProps {
  recentActivities: {
    id: string;
    user: {
      name: string | null;
    };
    createdAt: Date;
    total: number;
  }[];
}

const RecentActivity = ({ recentActivities }: RecentActivityProps) => {
  return (
    <div className="flex flex-col overflow-auto w-full h-full max-w-md mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
      </div>
      
      <div className="space-y-3">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-xl transition-colors hover:bg-gray-100">
              {/* Icon Container */}
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full text-white shrink-0 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-cart"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0 ml-4">
                <div className="text-sm font-medium text-gray-900">New item sold</div>
                <div className="text-xs text-gray-500 truncate mt-0.5">
                  {activity.user.name || "A user"} purchased an item for ${activity.total.toFixed(2)}
                </div>
              </div>

              {/* Timestamp */}
              <div className="ml-auto text-xs text-gray-400 shrink-0">
                {formatDistanceToNow(parseISO(activity.createdAt.toISOString()), { addSuffix: true })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No recent activity to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
