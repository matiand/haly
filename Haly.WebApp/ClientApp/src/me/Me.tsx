import { Outlet } from "react-router-dom";

function Profile() {
    return (
        <div>
            <div>
                <p>Profile</p>
                <h1>Username</h1>
                <p>0 Following</p>
            </div>
            <Outlet />
        </div>
    );
}

export default Profile;
