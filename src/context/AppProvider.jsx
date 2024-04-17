import React, { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useFireStore } from "../hook/useFireStore";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [isAddRoomModalVisible, setIsAddRoomModalVisible] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);

  const { user } = useContext(AuthContext);

  // cấu trúc của document room"
  /*
        name
        des
        members: [uid1,2,3.....]
      */
  const roomsCondition = useMemo(() => {
    if (!user || !user.uid) {
      console.log("khong co user");
      return null;
    }
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user]);

  const room = useFireStore("rooms", roomsCondition);

  const selectRoomId = React.useMemo(
    () => room.find((r) => r.id === selectedRoom),
    [room, selectedRoom]
  );
  const usersCondition = useMemo(() => {
    if (
      !Array.isArray(selectRoomId?.members) ||
      selectRoomId.members.length === 0
    ) {
      // Nếu mảng members không tồn tại hoặc là mảng rỗng, trả về một mảng chứa một phần tử không hợp lệ
      return ["invalid"]; // Hoặc bạn có thể trả về một mảng khác có ít nhất một phần tử
    }

    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectRoomId.members,
    };
  }, [selectRoomId?.members]);

  const members = useFireStore("users", usersCondition);

  //  console.log({members, selectedMember: selectRoomId?.members} )

  return (
    <AppContext.Provider
      value={{
        room,
        isAddRoomModalVisible,
        setIsAddRoomModalVisible,
        selectedRoom,
        setSelectedRoom,
        selectRoomId,
        members,
        isInviteModalVisible,
        setIsInviteModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
