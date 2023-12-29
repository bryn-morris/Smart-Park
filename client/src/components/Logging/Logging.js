import Layout from "../Layout"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import LoginPage from './LoginPage';

function Logging() {

  const { currentUser, setCurrentUser, setIsReLogOpen } = useContext(AuthContext)

  return (
    currentUser ? 
      <Layout /> : 
      <LoginPage 
        setCurrentUser = {setCurrentUser}
        setIsReLogOpen = {setIsReLogOpen}
      />
  )
}      

export default Logging;