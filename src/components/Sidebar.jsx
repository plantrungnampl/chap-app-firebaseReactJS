import { Col, Row } from "antd"
import { UserInfo } from "./UserInfo"
import { RoomList } from "./RoomList"

export const Sidebar = () => {
  return (
  
      <Row>
        <Col span={24}>
         <UserInfo/>

        </Col>
        <Col  span={24}>
        <RoomList/>
        </Col>
      </Row>
  )
}
