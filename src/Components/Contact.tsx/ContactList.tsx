import React, { FC, useState } from "react";

import store from "../../redux/store";
import { IContact } from "../../Models";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import nothing from "../../assets/images/nothing.webp";
import DeleteDialog from "../Dialogs/DeleteDialog";
import ViewDialog from "../Dialogs/ViewDialog";

const ContactList: FC = () => {
  const [contacts, setContacts] = useState<IContact[]>(
    store.getState().contacts
  );

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [contactToDelete, setContactToDelete] = useState<IContact>(
    {} as IContact
  );
  const [contactToView, setContactToView] = useState<IContact>({} as IContact)
  

  function closeDeleteModal() {
    setOpenDelete(false);
  }

  function openDeleteModal(contact: IContact) {
    setOpenDelete(true);
    setContactToDelete(contact);
  }

  function closeViewModal() {
    setOpenView(false);
  }

  function openViewModal(contact: IContact) {
    setOpenView(true);
    setContactToView(contact);
  }

  return (
    <>
      <div className="sm:mx-10 mx-8 my-6">
        <div className="flex sm:flex-row flex-col gap-2 justify-between mt-10 mb-24">
          <h1 className="text-5xl font-semibold">Contact List</h1>
          <Link
            to="/addcontact"
            className="cursor-pointer w-auto h-12 border-2 rounded-full border-black px-10 flex flex-col justify-center font-semibold hover:bg-black hover:text-white"
          >
            Add Contact
          </Link>
        </div>
        {contacts.length !== 0 ? (
          <div className="flex flex-row flex-wrap gap-10 mx-auto">
            {contacts.map((contact: IContact) => {
              return (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  openDeleteModal={openDeleteModal}
                  openViewModal={openViewModal}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <img
              src={nothing}
              alt="nothing"
              className="h-96 mix-blend-color-burn rounded-lg"
            />
            <h1 className="text-3xl font-semibold mt-4 ">
              You have no contacts
            </h1>
          </div>
        )}
      </div>
      <DeleteDialog
        setContacts={setContacts}
        open={openDelete}
        closeModal={closeDeleteModal}
        contactToDelete={contactToDelete}
      />
      <ViewDialog 
        open={openView}
        closeModal={closeViewModal}
        contact={contactToView}
      />
    </>
  );
};

export default ContactList;
