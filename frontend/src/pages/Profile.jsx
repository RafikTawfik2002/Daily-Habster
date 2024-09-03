import React, { useEffect, useState } from "react";
import { MdMenuBook } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoPlus } from "react-icons/go";

import { IoIosArrowDown } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

import { VscFeedback } from "react-icons/vsc";
import { GrStatusInfo } from "react-icons/gr";
import { TbArrowBackUp } from "react-icons/tb";

import OthersPageTitle from "../components/OthersPageTitle";
import ProfileDisplay from "../components/others/ProfileDisplay";
import ProfileEdit from "../components/others/ProfileEdit";
import PasswordUpdate from "../components/others/PasswordUpdate";


const Profile = (props) => {
    console.log("PROFILE PAGE")
    console.log(props)

    const user = props.user
    const navigate = useNavigate();
    

    useEffect(() => {
      if(!user){
        navigate("/Home")
      }

    }, [])

    const [state, setState] = useState(0)

    const arr = [<ProfileDisplay user={user} setState={setState} />, <ProfileEdit user={user} setState={setState} />,  <PasswordUpdate user={user} setState={setState} />]


  return (
    <>
  <OthersPageTitle />

<div className="relative overflow-hidden md:pt-28 lg:pt-32 pt-24 ">
      {user && arr[state]}
</div>
</>
  )
}

export default Profile
