/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import { increment, userData, updateUserDetails} from '../../app/redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';


export default function Dashboard() {
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState('');
  

  useEffect(() => {
  async function fetchData(){
    try {
      const app = new Realm.App({ id: "groot-scnkt" });
      const credentials = Realm.Credentials.anonymous();
      const loginId = localStorage.getItem('loginId') || 'dsfsdfsdfsdf';
      console.log("arjun");
      const user = await app.logIn(credentials);
      const isUserActive = await user.functions.isUserActive(loginId);
      setUserDetail({username: isUserActive[0].username,
      email: isUserActive[0].email,})
  
    } catch(err) {
      console.error("Failed to log in", err);
    }
  }
  fetchData();
  }, [ ]);

  useEffect(() => {
      dispatch(updateUserDetails(userDetail))
  }, [userDetail]);

    return (
      <main style={{background:"#6fe9c2",height:'100vh',width:'100%',margin:0,padding:'50px'}}> 
      <h1>Dashboard</h1>
      <h1>Hi {user.userName}</h1>
      <h1>your email Id {user.email}</h1>
      <h1>{user.value}</h1>
      <button onClick={() => dispatch(increment())}>clickme</button>
      </main>

    );
  }