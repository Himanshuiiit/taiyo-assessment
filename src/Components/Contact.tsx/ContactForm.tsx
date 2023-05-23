import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IContact } from "../../Models";
import store from "../../redux/store";
import { addContact, updateContact } from "../../redux/Actions/ContactActions";

const ContactForm = () => {
  const { state } = useLocation();
  const isEdit = state ? true : false;
  const contacts: IContact[] = store.getState().contacts;
  const dispatch = useDispatch();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const navigateTo = useNavigate();
  const initialImage =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1684748244~exp=1684748844~hmac=d09ea1837fd1678b40f161d92bb4b4185daae47c27a71014459aa8c5fa9be2aa";

  const [formData, setFormData] = useState<IContact>(
    isEdit
      ? state
      : {
          id: contacts[contacts.length - 1].id + 1,
          name: "",
          email: "",
          phone: "",
          address: "",
          image: initialImage,
          status: "",
        }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateContact(formData));
    } else {
      dispatch(addContact(formData));
    }
    setFormData({
      id: contacts[contacts.length - 1].id + 1,
      name: "",
      email: "",
      phone: "",
      address: "",
      image: initialImage,
      status: "active",
    });
    navigateTo("/");
  };

  return (
    <div className="mx-10 my-6">
      <h1 className="text-5xl font-semibold">
        {isEdit ? "Edit" : "Add"} Contact
      </h1>
      <form
        className="flex sm:flex-row flex-col my-16 gap-x-20"
        onSubmit={handleSubmit}
      >
        <div>
          <img
            src={formData.image}
            alt="contact"
            className="sm:w-96 sm:h-96 h-72 w-72 mx-auto rounded-full cursor-pointer object-cover"
          />
          <div className="flex justify-around">
            <button
              type="button"
              className="bg-white text-black border-2 font-semibold py-2 px-4 rounded-md mt-4"
              onClick={() => imageRef.current?.click()}
            >
              Upload Image
            </button>
            {formData.image !== initialImage && (
              <button
                type="button"
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md mt-4 ml-4"
                onClick={() =>
                  setFormData({
                    ...formData,
                    image: initialImage,
                  })
                }
              >
                Remove Image
              </button>
            )}
          </div>
          <input
            type="file"
            name="image"
            accept="image/png, image/gif, image/jpeg"
            id="image"
            ref={imageRef}
            onChange={(e) =>
              setFormData({
                ...formData,
                image: URL.createObjectURL(e.target.files![0]),
              })
            }
            className="hidden"
          />
        </div>
        <div className="sm:w-[40%] w-full">
          <label htmlFor="name" className="font-semibold text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border-2 border-gray-300 rounded-md p-2 w-full mb-8"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="email" className="font-semibold text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-2 border-gray-300 rounded-md p-2 w-full mb-8"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="phone" className="font-semibold text-lg">
            Phone No.
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="border-2 border-gray-300 rounded-md p-2 w-full mb-8"
            value={formData.phone}
            onChange={handleChange}
          />
          <label htmlFor="address" className="font-semibold text-lg">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            className="border-2 border-gray-300 rounded-md p-2 w-full mb-8"
            value={formData.address}
            onChange={handleChange}
            rows={5}
          />
          <label htmlFor="status" className="font-semibold text-lg">
            Status
          </label>
          <input
            type="radio"
            name="status"
            id="active"
            value="active"
            className="ml-4"
            defaultChecked={formData.status === "active"}
            onClick={() => setFormData({ ...formData, status: "active" })}
          />
          <label htmlFor="active" className="ml-2">
            Active
          </label>
          <input
            type="radio"
            name="status"
            id="inactive"
            value="inactive"
            className="ml-4"
            defaultChecked={formData.status === "inactive"}
            onClick={() => setFormData({ ...formData, status: "inactive" })}
          />
          <label htmlFor="inactive" className="ml-2">
            Inactive
          </label>
          <div className="mt-10">
            <button
              type="submit"
              className="bg-[#F0564F] text-white font-semibold py-2 px-4 rounded-md"
            >
              {isEdit ? "Edit" : "Add"} Contact
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
