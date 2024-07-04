import React, { useState } from "react";
import { useProfileContext } from "../Reducer/profileReducer";

function EditProfile() {
  const { user, updateProfile, updatedStatus, updatePics } =
    useProfileContext();
  const [info, setinfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    bio: user?.bio,
    password: "",
    conPassword: "",
  });

  const [picsData, setPicsData] = useState({
    pfp: "",
  });

  const id = user?._id;

  const handleImageUpload = (e) => {
    e.preventDefault();
    updatePics(id, picsData);
  };

  const handleForm = (e) => {
    e.preventDefault();
    updateProfile(info, id);
  };

  return (
    <>
      <div className="w-full my-2 relative bottom-3  flex items-center justify-center">
        <p className="text-center  font-bold text-2xl">Edit Profile</p>
      </div>

      {/* IMAGE EDIT FORM */}
      <div className="w-[80%]  h-[15vh] mx-auto border-b-2 border-gray-500 pb-1">
        <form
          onSubmit={handleImageUpload}
          enctype="multipart/form-data"
          className="flex  items-center justify-evenly h-full w-full"
        >
          <div className="w-[5.7em] h-[5.7em] rounded-full bg-black flex justify-center items-center">
            <img
              src={user?.pfp}
              alt=""
              className="rounded-full h-[5.5em] w-[5.5em] mx-auto object-cover"
            />
          </div>
          <div className="w-[60%]">
            <input
              type="file"
              name="pfp"
              id="pfp"
              className="block w-full text-base text-gray-900 border-2 border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
              onChange={(e) =>
                setPicsData({ ...picsData, pfp: e.target.files[0] })
              }
            />
            {picsData.pfp && (
              <input
                type="submit"
                value="Update Photo"
                className="border bg-blue-600 bg-opacity-100 font-bold text-white  border-gray-700 border-opacity-35 text-sm px-2 py-1 mt-2 rounded-lg cursor-pointer"
              />
            )}
          </div>
        </form>
      </div>

      {/* TEXT INFO UPDATE FORM */}
      <div>
        <h1 className="w-full text-center font-bold my-2 text-lg">
          Edit Profile Info
        </h1>
        <form onSubmit={handleForm}>
          <div className="w-[80%] mx-auto h-auto flex justify-evenly  gap-0.5 my-2 formInput">
            <input
              required
              type="text"
              placeholder="First name"
              value={info.firstName}
              onChange={(e) => setinfo({ ...info, firstName: e.target.value })}
              className="border w-[49%] border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              value={info.lastName}
              onChange={(e) => setinfo({ ...info, lastName: e.target.value })}
              className="border w-[49%] border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
            />
          </div>

          <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 my-2 formInput">
            <input
              required
              type="email"
              value={info.email}
              onChange={(e) => setinfo({ ...info, email: e.target.value })}
              placeholder="Enter your Mail"
              className="border border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
            />
          </div>
          <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 my-2 formInput">
            <textarea
              maxLength={75}
              value={info?.bio}
              onResize={false}
              onChange={(e) => setinfo({ ...info, bio: e.target.value })}
              placeholder="Enter your bio"
              className="border border-gray-700 resize-none border-opacity-35 rounded-sm px-2 py-2"
            />
          </div>

          <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 my-1.5 formInput">
            <input
              type="submit"
              value="Update Profile"
              className="border bg-blue-600 bg-opacity-100 font-bold text-white my-4 border-gray-700 border-opacity-35 rounded-sm px-2 py-2 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
