import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { reset } from '../../store/slices/authSlice';
import profile from "../../assets/profile.png";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {fullName, email} = useSelector(store=>store.auth);

  const logout = () => { 
    dispatch(reset()); 
     navigate("/login");
  }

  return (
    <section className="profile-container">
      <h1>Profile</h1>
      <div className="profile-data">
        <img src={profile} alt="profile-img" />

        <p>{fullName}</p>

        <span>{email}</span>

        <button className="profile-logout_btn" onClick={logout}>Log out</button>
      </div>
    </section>
  );
}

export default Profile;