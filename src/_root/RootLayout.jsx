import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { Col, Row } from 'antd'
import { AddRoomModal } from '../components/Modal/AddRoomModal'
import { InviteModal } from '../components/Modal/InviteModal'
// import { Bottom } from '../components/Bottom'

export const RootLayout = () => {
  return (
    <div>
      <Row>

        {/* sidebar */}
        <Col span={5} className='bg-slate-600 h-screen' >
       <Sidebar/>
        </Col>


        {/* Home */}
        <Col span={19}> 
         <Outlet/>
         </Col>

     <AddRoomModal/>
     <InviteModal/>
      </Row>
     
    </div>
  )
}
