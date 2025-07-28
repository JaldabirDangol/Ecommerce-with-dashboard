// components/RecentActivity.js
import React from 'react'; // React 19 is implicitly imported in Next.js 15 pages/components

const RecentActivityItem = ({ icon, title, description, timeAgo }) => (
  <div className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm mb-3">
    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${icon.bgClass}`}>
      {/* Assuming you're using an icon library or SVG directly */}
      {/* For simplicity, we'll use emojis or basic shapes. In a real app, use an actual icon component. */}
      {icon.type === 'shoppingCart' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      )}
      {icon.type === 'bell' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )}
    </div>
    <div className="flex-grow">
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className="flex-shrink-0 text-sm text-gray-500">
      {timeAgo}
    </div>
  </div>
);

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-2/5 h-93">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
      {activities.length === 0 ? (
        <p className="text-gray-600">No recent activity.</p>
      ) : (
        <div>
          {activities.map((activity, index) => (
            <RecentActivityItem
              key={index} // In a real app, use a unique ID from the activity data
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              timeAgo={activity.timeAgo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;