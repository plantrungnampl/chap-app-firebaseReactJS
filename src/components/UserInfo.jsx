import { Avatar, Button, Typography } from 'antd'
import React, { useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { db } from '../firebase/config';
import { onSnapshot } from 'firebase/firestore';
import { collection } from 'firebase/firestore'; 
export const UserInfo = () => {
    const { user,handleFbLogin,handleLogout } = React.useContext(AuthContext);
   
    // useEffect(() => {
    //     // Tạo một query đến collection 'users'
    //     const usersCollectionRef = collection(db, 'users');
    //     const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //         console.log('data', data);
    //         console.log('docs', snapshot.docs);
    //         console.log('snapshot', snapshot);
    //     });

    //     // Dọn dẹp khi component unmount
    //     return () => unsubscribe();
    // }, []); // Dependency array rỗng để chỉ tạo listener một lần

  return (
    <>
    {user ? (
        <div className='flex justify-between p-2 items-center'>
            <div className='flex gap-2 justify-center items-center'>
                <Avatar src={user.photoURL}></Avatar>
                <Typography.Text>{user.displayName}</Typography.Text>
            </div>
            <Button onClick={handleLogout}>Đăng xuất</Button>
        </div>
    ) : (
        <div className='flex justify-center items-center'>
            <Button onClick={handleFbLogin}>Đăng nhập</Button>
        </div>
    )}
</>

  )
}
