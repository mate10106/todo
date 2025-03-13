"use client";

import { getTodoStats } from "@/actions/todo";
import { ProfileFieldProps, todoStatsProps } from "@/types";
import { Calendar, CheckCircle2, Clock, Mail, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Image from "next/image";
import { Button } from "./ui/button";
import { deleteUser } from "@/actions/profile";
import EditProfileComponents from "./EditProfileComponents";
import DeleteAlertComponents from "./DeleteAlertComponents";
import RecentActivityComponents from "./RecentActivityComponents";
import { getUserActivities } from "@/actions/activity";
import { Activity } from "@prisma/client";

const ProfileComponents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const { data: session } = useSession();
  const [stats, setStats] = useState<todoStatsProps>({
    totalTasks: 0,
    completed: 0,
    inProgress: 0,
    overdue: 0,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const user = session?.user;

  useEffect(() => {
    const fetchStats = async () => {
      if (session?.user?.id) {
        const todoStats = (await getTodoStats(
          session.user.id
        )) as todoStatsProps;
        setStats(todoStats);
      }
    };

    const fetchActivities = async () => {
      if (session?.user?.id) {
        const recentActivities = await getUserActivities(session.user.id, 5);
        setActivities(recentActivities);
      }
    };
    fetchStats();
    fetchActivities();
  }, [session?.user?.id]);

  const handleDelete = async () => {
    if (session?.user?.id) {
      await deleteUser(session.user.id);
      window.location.href = "/";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600" />
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:space-x-5">
              <div className="relative group">
                <Image
                  src={user?.image || "/person.svg"}
                  alt={user?.name || "username"}
                  width={220}
                  height={220}
                  className="w-32 h-32 rounded-xl shadow-lg object-cover border-4 border-white bg-gradient-to-r from-blue-400 to-blue-600"
                />
              </div>

              <div className="mt-6 sm:mt-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h1>
                <p className="text-gray-500"></p>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  onClick={handleOpenModal}
                  className="mt-6 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={() => setShowDeleteAlert(true)}
                  className="mt-6 sm:mt-0 px-4 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={22} />
                </Button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileField
                icon={<Mail />}
                label="Email"
                value={`${user?.email}`}
              />
              <ProfileField
                icon={<Calendar />}
                label="Joined"
                value="March 2024"
              />
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Statistics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <StatCard
                  icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
                  label="Total Tasks"
                  value={stats.totalTasks.toString()}
                />
                <StatCard
                  icon={<Clock className="w-5 h-5 text-blue-500" />}
                  label="Completed"
                  value={stats.completed.toString()}
                />
                <StatCard
                  icon={<CheckCircle2 className="w-5 h-5 text-yellow-500" />}
                  label="In Progress"
                  value={stats.inProgress.toString()}
                />
                <StatCard
                  icon={<Clock className="w-5 h-5 text-red-500" />}
                  label="Overdue"
                  value={stats.overdue.toString()}
                />
              </div>
            </div>
          </div>
          <div className="ml-7">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <RecentActivityComponents activities={activities} />
          </div>
        </div>
      </div>
      {isModalOpen && <EditProfileComponents closeModal={handleCloseModal} />}
      <DeleteAlertComponents
        showDeleteAlert={showDeleteAlert}
        setShowDeleteAlert={setShowDeleteAlert}
        handleDelete={handleDelete}
      />
    </div>
  );
};

function ProfileField({ icon, label, value }: ProfileFieldProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-blue-500">{icon}</div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 space-y-4 hover:shadow-xl transition-all duration-500">
      <p>{icon}</p>
      <p className="text-sm text-gray-500 font-bold">{label}</p>
      <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
        {value}
      </p>
    </div>
  );
}

export default ProfileComponents;
