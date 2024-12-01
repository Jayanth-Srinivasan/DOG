import React from "react";
import { Button } from "@/components/ui/button";

interface UserRequest {
  id: string;
  username: string;
  email: string;
}

interface UserRequestItemProps {
  request: UserRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const UserRequestItem: React.FC<UserRequestItemProps> = ({ request, onApprove, onReject }) => {
  return (
    <li className="p-4 bg-gray-800 rounded-lg shadow-lg flex justify-between items-center">
      <div>
        <h4 className="text-xl font-bold">{request.username}</h4>
        <p className="text-gray-400">{request.email}</p>
      </div>
      <div className="flex space-x-4">
        <Button
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
          onClick={() => onApprove(request.id)}
        >
          Approve
        </Button>
        <Button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={() => onReject(request.id)}
        >
          Reject
        </Button>
      </div>
    </li>
  );
};

export default UserRequestItem;
