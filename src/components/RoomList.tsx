import { Button, Collapse, ConfigProvider, Typography } from "antd";
import React, { useContext, useMemo } from "react";
import { useFireStore } from "../hook/useFireStore";
import { AuthContext } from "../context/AuthProvider";
import { AppContext, AppProvider } from "../context/AppProvider";
const { Panel } = Collapse;
const { Text, Link } = Typography;
export const RoomList = () => {
  const { room, setIsAddRoomModalVisible, selectedRoom, setSelectedRoom } =
    useContext(AppContext);
  console.log("selected Rom ====", selectedRoom);
  const handleAddRoom = () => {
    setIsAddRoomModalVisible(true);
  };

  const handleSelectRoom = (id) => {
    setSelectedRoom(id);
  };
  const items = [
    {
      key: 1,
      label: "list room",
      children: [
        <div className="flex flex-col gap-3">
          {room.map((roomss) => {
            return (
              <Link key={roomss.id} onClick={() => handleSelectRoom(roomss.id)}>
                {roomss.name}
              </Link>
            );
          })}
          <Button onClick={handleAddRoom}>Thêm Phòng</Button>,
        </div>,
      ],
    },
  ];
  return (
    <>
      <Collapse items={items} defaultActiveKey={["1"]}></Collapse>
    </>
  );
};
