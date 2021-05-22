import React from 'react'
import UserNav from '../../components/nav/UserNav';
import ProfileForm from '../../components/forms/ProfileForm';

function Profile({match,history}) {
    return (
        <div className="container-fluid marginheader">
        <div className="row ">
            <div className="col-md-2 mt-4">
                <UserNav />
            </div>
          <div className="col mt-4">
            <ProfileForm
            match={match}
            history={history}
            />
          </div>
        </div>
    </div>
    )
}

export default Profile
