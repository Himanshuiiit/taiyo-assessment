import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { FcContacts, FcComboChart } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: IProps) => {
  const activeLink: string = window.location.pathname.split("/")[1];
  const [selected, setSelected] = useState<number>(activeLink === "charts" ? 1 : 0);

  return (
    <div
      className={`sm:w-[20%] sm:sticky sm:top-[0] fixed w-[60%] z-[10000] h-screen border border-slate-300 bg-white ${
        open ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between">
        <img src={logo} alt="logo" className="w-1/2 mx-8 my-4" />
        <span className="flex flex-col justify-center mr-8">
          <AiOutlineClose
            className="scale-150 cursor-pointer sm:hidden block"
            onClick={() => setOpen(!open)}
          />
        </span>
      </div>
      <div className="flex flex-col justify-start mt-28 gap-3 mx-8 h-2/3 text-2xl">
        <Link
          to={"/"}
          className={`flex flex-row cursor-pointer ${
            selected === 0 ? "font-medium" : "text-gray-500"
          }`}
          onClick={() => setSelected(0)}
        >
          <FcContacts
            className={`relative top-1 mr-2 ${selected === 0 && "scale-110"}`}
          />
          Contacts
        </Link>
        <Link
          to={"/charts"}
          className={`flex flex-row cursor-pointer ${
            selected === 1 ? "font-medium" : "text-gray-500"
          }`}
          onClick={() => setSelected(1)}
        >
          <FcComboChart
            className={`relative top-1 mr-2 ${selected === 0 && "scale-110"}`}
          />
          Charts and Maps
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
