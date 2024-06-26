import Layout from "../Layout"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import LoginPage from './LoginPage';

function Logging() {

  const { currentUser } = useContext(AuthContext)

  return (
    currentUser ? 
      <Layout /> : 
      <LoginPage />
  )
}      

export default Logging;