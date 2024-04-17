import React, { useContext, useState, useCallback } from 'react';
import { Avatar, Form, Modal, Select } from 'antd';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { collection, query, where, getDocs, onSnapshot, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import _ from 'lodash';

const DebounceSelect = ({ fetchOptions, debounceTimeout = 300,curMembers, ...props  }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useCallback(_.debounce(async (search) => {
    setFetching(true);
//   console.log(search)
    const newOptions = await fetchOptions(search, curMembers); // Giả sử curMembers được truyền vào từ nơi nào đó
//   console.log(search)

    setOptions(newOptions);
    setFetching(false);
  }, debounceTimeout), [fetchOptions, debounceTimeout]);
 

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <div>Loading...</div> : null}
      {...props}
    >
        
    
        
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value} title ={option.label}>
          
          <Avatar src={option.photoURL}>
            {option.photoURL ? '' : option.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${option.label}`}
        </Select.Option>
      ))}

    </Select>

  );
};

const fetchUserList = async (search, curMembers) => {
    const usersRef = collection(db, 'users');
    // Sử dụng query() để kết hợp các điều kiện truy vấn.
    const q = query(
      usersRef, 
      where('keywords', 'array-contains', search.toLowerCase()),
      orderBy('displayName'), // Gọi orderBy() riêng biệt.
      limit(10)
       // Gọi limit() riêng biệt.
    );
 
    const querySnapshot = await getDocs(q);
    const userList = querySnapshot.docs.map(doc => ({
      value: doc.data().uid,
      label: doc.data().displayName,
      photoURL: doc.data().photoURL,
    }));
    
    // Lọc ra những người dùng đã là thành viên hiện tại.
    return userList.filter(user => !curMembers.includes(user.value));
  };
  


export const InviteModal = () => {
    const [value,setValue] = React.useState([])
    const [form] = Form.useForm()
    const {user: {uid}} = useContext(AuthContext)
  
    
    const {isInviteModalVisible, setIsInviteModalVisible,selectRoomId,selectedRoom} = useContext(AppContext)
    const handleOk = () => {
        console.log(form.getFieldsValue())
       
        form.resetFields()
        setValue([])
        const roomRef = doc(db, 'rooms', selectedRoom)

        updateDoc(roomRef, {
            members: [...selectRoomId.members, ...value.map((val) => val.value)],
          });
        setIsInviteModalVisible(false)
    }
    const handleCancel = () => {
        setIsInviteModalVisible(false)
    }
  return (
    <Modal
     title ="Mời thành viên"
     filterOption={false}
     open ={isInviteModalVisible}
     onOk={handleOk}
     onCancel={handleCancel}
     closable={true}
     >
      <Form form={form} layout='vertical'>
        <DebounceSelect label = "Tên thành viên " mode = "multiple" value={value}  placeholder="Nhập tên thành viên "   onChange = {newValue => setValue(newValue)  }
        className="w-full"
        curMembers={selectRoomId?.members}
        fetchOptions={fetchUserList}
        >
        </DebounceSelect>
      </Form>
    </Modal>
  )
}
