import React, { useContext } from 'react'
import { Form, Input, Modal } from 'antd'
import { AppContext } from '../../context/AppProvider'
import { addDocument } from '../../firebase/service'
import { AuthContext } from '../../context/AuthProvider'
import { serverTimestamp } from 'firebase/firestore'
export const AddRoomModal = () => {
    const [form] = Form.useForm()
    const {user: {uid}} = useContext(AuthContext)

    const {isAddRoomModalVisible, setIsAddRoomModalVisible} = useContext(AppContext)
    const handleOk = () => {
        console.log(form.getFieldsValue())
        addDocument('rooms', {
        ...form.getFieldsValue(), members: [uid], 
        })

        // reset vbale
        form.resetFields()
        setIsAddRoomModalVisible(false)
    }
    const handleCancel = () => {
        setIsAddRoomModalVisible(false)
    }
  return (
    <Modal
     title ="tạo phòng"
     open ={isAddRoomModalVisible}
     onOk={handleOk}
     onCancel={handleCancel}
     closable={true}
     >
      <Form form={form} layout='vertical'>
        <Form.Item
          label="Tên phòng"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}
        >
          <Input  placeholder='Tên phòng' />
        </Form.Item>
     
        <Form.Item
          label="Mô tả"
          name="description"
        >
          <Input placeholder='Mô tả' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
