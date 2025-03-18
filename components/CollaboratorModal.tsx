import { useState, useEffect } from "react";
import { X, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getAllUsers } from "@/data/user";

interface Collaborator {
  id?: string;
  name?: string;
  email: string;
}

interface CollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  OnSelect: (collaborators: Collaborator[]) => void;
  selectedCollaborators: Collaborator[];
}

const CollaboratorModal = ({
  isOpen,
  onClose,
  OnSelect,
  selectedCollaborators,
}: CollaboratorModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(false);
  const [localSelectedCollaborators, setLocalSelectedCollaborators] = useState<
    Collaborator[]
  >(selectedCollaborators || []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await getAllUsers();
      if (!users || users.length === 0) {
        throw new Error("Failed to fetch users");
      }
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers().then((users) => {
        if (searchQuery.length === 0) {
          const collaborators: Collaborator[] = users.map((user) => ({
            id: user.id,
            name: user.name || undefined,
            email: user.email || "",
          }));
          setSearchResults(collaborators);
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setLoading(true);

      fetchUsers().then((users) => {
        const results = users.filter(
          (user) =>
            user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const collaborators: Collaborator[] = results.map((user) => ({
          id: user.id,
          name: user.name || undefined,
          email: user.email || "",
        }));
        setSearchResults(collaborators);
        setLoading(false);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleAddCollaborator = (collaborator: Collaborator) => {
    if (!localSelectedCollaborators.some((c) => c.id === collaborator.id)) {
      const updatedCollaborators = [
        ...localSelectedCollaborators,
        collaborator,
      ];
      setLocalSelectedCollaborators(updatedCollaborators);
    }
  };

  const handleRemoveCollaborator = (index: number) => {
    const updatedCollaborators = [...localSelectedCollaborators];
    updatedCollaborators.splice(index, 1);
    setLocalSelectedCollaborators(updatedCollaborators);
  };

  const handleSave = () => {
    OnSelect(localSelectedCollaborators);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm dark:backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Add Collaborators
            </h1>
            <Button
              variant="ghost"
              onClick={onClose}
              className="rounded-lg p-1 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="text-gray-500 dark:text-gray-400" />
            </Button>
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search users by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl border border-gray-300 dark:border-gray-600"
            />
          </div>

          {localSelectedCollaborators.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Selected Collaborators:
              </h3>
              <div className="flex flex-wrap gap-2">
                {localSelectedCollaborators.map((collaborator, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    <span>{collaborator.name || collaborator.email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCollaborator(index)}
                      className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            {loading ? (
              <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleAddCollaborator(user)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gray-200 dark:bg-gray-600 rounded-full p-2">
                      <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  {localSelectedCollaborators.some((c) => c.id === user.id) && (
                    <div className="text-xs text-green-500">Added</div>
                  )}
                </div>
              ))
            ) : searchQuery ? (
              <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                No users found matching "{searchQuery}"
              </div>
            ) : (
              <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                Start typing to search for users
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-lg text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm"
            >
              Add Collaborators
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorModal;
