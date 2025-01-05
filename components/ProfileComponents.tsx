"use client";

import { getTodoStats } from "@/actions/todo";
import { ProfileFieldProps, todoStatsProps } from "@/types";
import { Calendar, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Image from "next/image";
import { Button } from "./ui/button";
import { deleteUser } from "@/actions/profile";
import EditProfileComponents from "./EditProfileComponents";

const ProfileComponents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    fetchStats();
  }, [session?.user?.id]);

  const deleteProfile = async () => {
    return deleteUser;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
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
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.name}
                </h1>
                <p className="text-gray-500">Product Designer</p>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  onClick={handleOpenModal}
                  className="mt-6 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={() => {}}
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
                icon={<Phone />}
                label="Phone"
                value="+1 (555) 123-4567"
              />
              <ProfileField
                icon={<MapPin />}
                label="Location"
                value="San Francisco, CA"
              />
              <ProfileField
                icon={<Calendar />}
                label="Joined"
                value="March 2024"
              />
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Statistics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard
                  label="Total Tasks"
                  value={stats.totalTasks.toString()}
                />
                <StatCard
                  label="Completed"
                  value={stats.completed.toString()}
                />
                <StatCard
                  label="In Progress"
                  value={stats.inProgress.toString()}
                />
                <StatCard label="Overdue" value={stats.overdue.toString()} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <EditProfileComponents closeModal={handleCloseModal} />}
    </div>
  );
};

function ProfileField({ icon, label, value }: ProfileFieldProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
        <div className="text-blue-500">{icon}</div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

export default ProfileComponents;
