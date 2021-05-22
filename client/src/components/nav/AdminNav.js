import React from 'react';
import {Link} from 'react-router-dom';

const AdminNav =()=>{

   return (
    <nav style={{minHeight:"100vh"}}>
    <ul className="nav flex-column">
        <li className="nav-item" className="nav-link">
                  <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
                  <Link to="/admin/product" className="nav-link">Product</Link>
        </li>
        <li className="nav-item">
                  <Link to="/admin/products" className="nav-link">Products</Link>
        </li>
        <li className="nav-item">
                  <Link to="/admin/category" className="nav-link">Category</Link>
        </li>
        <li className="nav-item">
                  <Link to="/admin/sub" className="nav-link">Sub Category</Link>
        </li>
        <li className="nav-item">
                  <Link to="/admin/item" className="nav-link">Item</Link>
        </li>
        <li className="nav-item">
                  <Link to="/admin/slider" className="nav-link">Slider</Link>
        </li>
        {/* <li className="nav-item">
                  <Link to="/admin/coupon" className="nav-link">Coupon</Link>
        </li> */}
        <li className="nav-item">
                  <Link to="/user/password" className="nav-link">Password</Link>
        </li>
    </ul>
</nav>
   )
}

export default AdminNav