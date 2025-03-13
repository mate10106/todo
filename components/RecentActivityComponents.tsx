// components/RecentActivityComponents.tsx
import { formatDistanceToNow } from "date-fns";

type Activity = {
  id: string;
  action: string;
  todoId: string;
  todoTitle: string;
  timestamp: Date;
};

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivityComponents = ({ activities }: RecentActivityProps) => {
  if (!activities || activities.length === 0) {
    return <div className="text-gray-500 py-4">No recent activity found.</div>;
  }

  const getActionText = (action: string) => {
    switch (action) {
      case "CREATED":
        return "Created new task";
      case "COMPLETED":
        return "Completed task";
      case "MODIFIED":
        return "Modified task";
      case "REMOVED":
        return "Removed task";
      default:
        return "Updated task";
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex justify-between items-center py-3 bg-black/5 dark:bg-gray-800 rounded-lg"
        >
          <div className="m-2">
            <div className="font-medium dark:text-white">
              {getActionText(activity.action)}
            </div>
            <div className="text-blue-600">{activity.todoTitle}</div>
          </div>
          <div className="text-gray-500 mr-2">
            {formatDistanceToNow(new Date(activity.timestamp), {
              addSuffix: true,
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivityComponents;
