import React from "react";
import UserRequestItem from "./UserRequestItem";

interface UserRequest {
  id: string;
  username: string;
  email: string;
}

interface UserRequestListProps {
  requests: UserRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const UserRequestList: React.FC<UserRequestListProps> = ({ requests, onApprove, onReject }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">User Join Requests</h3>

      <ul className="space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <UserRequestItem
              key={request.id}
              request={request}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))
        ) : (
          <p>No requests at the moment.</p>
        )}
      </ul>
    </div>
  );
};

export default UserRequestList;
