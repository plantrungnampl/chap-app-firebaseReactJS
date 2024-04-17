import { Avatar, Typography } from "antd";
import React from "react";
import { AuthContext } from "../context/AuthProvider";
import {
  formatDistance,
  formatDistanceToNow,
  subDays,
  formatRelative,
} from "date-fns";
export const Message = ({ text, displayName, createdAt, photoUrl }) => {
  const { user } = React.useContext(AuthContext);
  const formatDate = (seconds) => {
    let formattedDate = "";

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());

      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Avatar src="a"></Avatar>
        <Typography.Text className="font-bold ml-1">
          {displayName}
        </Typography.Text>
        <Typography.Text className="ml-1 opacity-50 font-normal">
          {/* {formatData(createAt?.seconds)} */}
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div className="ml-4 flex items-center">
        <Typography.Text>{text}</Typography.Text>
      </div>
    </div>
  );
};
