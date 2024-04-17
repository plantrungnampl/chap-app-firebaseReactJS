import { Button, Col, Row, Typography } from 'antd';
const { Title } = Typography;
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';




export const Signin = () => {
const {  handleFbLogin} = useContext(AuthContext)
  
  return (
    <div>
          <Row align="center" justify='center' style={{height:"800px"}}>
            <Col span={8}>
                <Title style={{textAlign:"center"}} level={3}>Chat online</Title>
                <div style={{display:"flex", flexDirection:"column", gap:10}}>
                    <Button onClick={handleFbLogin}>
                        Đăng nhập bằng Facebook
                    </Button>
                    <Button >
                        Đăng nhập bằng Google
                    </Button>
                    <Button >
                       Đăng nhập bằng Githup
                    </Button>
                </div>
            </Col>
        </Row>
    </div>
  )
}
