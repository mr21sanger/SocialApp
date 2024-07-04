import React, { useEffect, useState } from "react";
import PeapleBox from "./PeopleBox";
import { useProfileContext } from "../Reducer/profileReducer";

function MorePeopleBox() {
  var { user, allUsers } = useProfileContext();
  const { getAllUser } = useProfileContext();
  allUsers = allUsers?.data;
  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div className="py-2">
      <h1 className="text-center w-full font-semibold text-lg">
        People You May Know
      </h1>
      <div className="w-full h-[18.5em] rounded-md no-scrllbar scrollbar-hover slik-slide overflow-y-scroll my-2">
        {allUsers?.map((currElem) => {
          console.log(currElem._id, user?._id);
          if (currElem?._id == user?._id) return;
          else {
            return <PeapleBox data={currElem} key={currElem?._id} />;
          }
        })}
      </div>
    </div>
  );
}

export default MorePeopleBox;
