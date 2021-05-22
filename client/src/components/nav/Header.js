import React, { Children, useEffect, useState } from "react";
import { Menu, Badge, Avatar, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  HistoryOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import firebase from "firebase";
import Search from "../forms/Search";
import { cartReducer } from "../../reducers/CartReducer";
import Menubar from "./Menubar";

import './header.css'

const {  Item} = Menu;

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { user, cart, search } = useSelector((state) => {
    return { ...state };
  });

const [click,setClick]=useState(false)

useEffect(()=>{

  if(window.innerWidth > 700){
    setClick(true)
  }

 window.addEventListener("resize",handleResize)
 return ()=>window.removeEventListener('resize',handleResize)
  
},[])


const handleResize=(e)=>{

if(e.target.innerWidth > 700){
  setClick(true)
}

if(e.target.innerWidth <=700){
  setClick(false)
}

}



  
  

 

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/");
  };

  const menu = (
    <Menu>
      {user ? (
        <Item icon={<ProfileOutlined />}>{user.name}</Item>
      ) : (
        <Menu.Item key="1" icon={<LoginOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}

      {!user ? null : (
        <Menu.Item key="2" onClick={logout} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      )}
     {
       user&&user.role=="admin" &&<Item key="4" icon={<HistoryOutlined />}>
       <Link to='/admin/dashboard'>Admin Dashboard</Link>
     </Item>
     }
{
       user&&user.role=="subscriber" &&<Item key="4" icon={<HistoryOutlined />}>
       <Link to='/user/dashboard'>User Dashboard</Link>
     </Item>
     }

    </Menu>
  );

  

  return (
    <div className="container-fluid header-fixed" id="top" style={{background:"skyblue",padding:"0",margin:"0"}}>
    <div className="row header" style={{background:"#C3003C",textAlign:"center",height:"50px",padding:"0",margin:"0"}}>
      <div className="col m-auto logo">
      <a  id="logo-link"
       href="/" 
       style={{color:"white",
          fontSize:"25px",
            lineHeight:"50px"}}>Bhawal Electronics</a>
            <Link className="cart-small" to="/cart">
          <Badge count={cart.length} offset={[-2, 5]}>
            <Avatar
              style={{ background: "none",fontSize:"25px" }}
              icon={<ShoppingCartOutlined />}
            />
          </Badge>
        </Link>
      <div id="menu-btn"  onClick={()=>{
        setClick(!click)
      }}>
        {click?<i class="fas fa-times"></i>:<i class="fas fa-bars"></i>}
      </div>

      </div>
      <div className="col m-auto search">
           <Search />
      </div>
      <div className="col m-auto  profile" >
        <span style={{ marginRight: "20px" }}>
          <Dropdown.Button
            overlay={menu}
            placement="bottomCenter"
            icon={<UserOutlined />}
          ></Dropdown.Button>
        </span>
        <Link to="/cart">
          <Badge count={cart.length} offset={[-2, 5]}>
            <Avatar
              style={{ background: "none",fontSize:"25px" }}
              icon={<ShoppingCartOutlined />}
            />
          </Badge>
        </Link>
      </div>
    </div>
<div className="row" style={{background:"#ccc",boxShadow:"0 0 10px black",padding:"0",margin:"0"}}>
{

click?
<div className="col m-auto" id="menubar">
<Menubar />
</div>:""}
</div>
<div>
  {props.children}
</div>
    </div>
  );
};

export default Header;
