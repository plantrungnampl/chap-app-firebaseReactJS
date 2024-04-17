import { Avatar, Button, Form, Input, Space, Tooltip } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import { Message } from "../../components/Message";
import { AuthContext } from "../../context/AuthProvider";
import { AppContext } from "../../context/AppProvider";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { addDocument } from "../../firebase/service";
import { useFireStore } from "../../hook/useFireStore";

export const Home = () => {
  const [messages, setMessages] = React.useState([]);
  const [InputValue, setInputValue] = React.useState("");
  const scroll = useRef();
  const {
    room,
    selectedRoom,
    selectRoomId,
    members,
    isInviteModalVisible,
    setIsInviteModalVisible,
  } = useContext(AppContext);
  const {
    user: { uid, displayName, photoURL },
  } = useContext(AuthContext);

  console.log("room ====", room);
  console.log("selected====", selectedRoom);

  // const selectRoomId = React.useMemo (
  //   () =>  room.find((r) => r.id === selectedRoom),
  //   [room, selectedRoom]
  // )
  const showModalInvite = () => {
    setIsInviteModalVisible(true);
  };
  const { form } = Form.useForm();
  const handleSubmitMessages = async () => {
    addDocument("messages", {
      text: InputValue,
      uid,
      photoURL,
      roomId: selectedRoom,
      displayName,
    });

    setInputValue("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom,
    }),
    [selectedRoom]
  );
  const message = useFireStore("messages", condition);
  console.log("message", message);
  return (
    <div className="h-screen">
      <div className=" flex justify-between bg-slate-700 items-center p-1">
        <div className="flex flex-col ">
          <p className="text-white text-[32px] font-bold">
            {selectRoomId?.name}
          </p>
          <span className="text-slate-300">{selectRoomId?.description} </span>
        </div>
        <div className="flex gap-2">
          <Button onClick={showModalInvite}>Mời</Button>
          <Avatar.Group className="flex">
            {members.map((memberUser) => (
              <Tooltip key={memberUser.id} title={memberUser.displayName}>
                <Avatar src={memberUser.photoUrl}>
                  {" "}
                  {memberUser.photoUrl
                    ? ""
                    : memberUser.displayName?.charAt(0)}{" "}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      </div>

      <div className="h-[calc(100%-77px)] flex flex-col p-4 justify-end">
        <div className="message-klist max-h-full overflow-y-auto ">
          {message.map((mes) => {
            return (
              <Message
                scroll={scroll}
                key={mes.id}
                text={mes.text}
                photoUrl={mes.photoUrl}
                createdAt={mes.createdAt}
                displayName={mes.displayName}
              ></Message>
            );
          })}
        </div>
        <span ref={scroll}></span>

        <Form form={form} layout="vertical" onFinish={handleSubmitMessages}>
          <Input
            name="message"
            onChange={(e) => setInputValue(e.target.value)}
            value={InputValue}
            autoComplete="off"
            placeholder="Type a message"
          />
          <Button type="primary" onClick={handleSubmitMessages}>
            Gửi
          </Button>
        </Form>
      </div>
    </div>
  );
};
