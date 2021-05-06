import React from'react';
import UserNav from '../../components/nav/UserNav';

const UserDashBoard=()=>{


return (
    <div className="container-fluid marginheader">
    <div className="row ">
        <div className="col-md-2 mt-4">
            <UserNav />
        </div>
      <div className="col mt-4">
      <h4>User Dahboard</h4>
      </div>
    </div>
</div>
)

}

export default UserDashBoard