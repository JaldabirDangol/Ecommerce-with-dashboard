export default function DashboardLoading() {
  return (
    <div className="flex flex-col w-full h-full gap-4 py-4 animate-pulse">
      <div className="flex w-full justify-between gap-4">
        <div className="bg-gray-200 h-28 w-1/4 rounded-xl"></div>
        <div className="bg-gray-200 h-28 w-1/4 rounded-xl"></div>
        <div className="bg-gray-200 h-28 w-1/4 rounded-xl"></div>
        <div className="bg-gray-200 h-28 w-1/4 rounded-xl"></div>
      </div>

      <div className="flex w-full gap-3">
        <div className="bg-gray-200 h-72 flex-1 rounded-xl"></div>
        <div className="bg-gray-200 h-72 flex-1 rounded-xl"></div>
        <div className="bg-gray-200 h-72 flex-1 rounded-xl"></div>
      </div>

      <div className="flex w-full gap-3 h-93">
        <div className="bg-gray-200 flex-1 rounded-xl"></div>
        <div className="bg-gray-200 flex-1 rounded-xl"></div>
      </div>
    </div>
  );
}
