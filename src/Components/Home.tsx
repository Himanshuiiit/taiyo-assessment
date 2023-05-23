import React from "react";
import { Outlet } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Home = ({ open, setOpen }: IProps) => {
  return (
    <div className="sm:w-[80%] w-full">
      <span className="justify-center ml-8 mt-12 sm:hidden block">
        <HiMenuAlt1
          className="scale-150 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </span>
      <Outlet />
    </div>
  );
};

export default Home;
