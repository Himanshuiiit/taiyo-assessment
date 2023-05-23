import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IContact } from "../../Models";

interface IProps {
  open: boolean;
  closeModal: () => void;
  contact: IContact;
}

const ViewDialog = ({ open, closeModal, contact }: IProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[10001]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  View Contact
                </Dialog.Title>
                <div className="flex flex-col">
                  <img
                    src={contact.image}
                    alt="profile"
                    className="w-20 h-20 my-3 mx-auto rounded-full object-cover"
                  />
                  <div className="font-medium py-2 px-8">
                    <div className="py-1">
                      Name:
                      <span className="text-gray-500">
                        &emsp;&emsp;{contact.name}
                      </span>
                    </div>
                    <div className="py-1">
                      Email:
                      <span className="text-gray-500">
                        &emsp;&emsp; {contact.email}
                      </span>
                    </div>
                    <div className="py-1">
                      Phone:
                      <span className="text-gray-500">
                        &ensp; &emsp;{contact.phone}
                      </span>
                    </div>
                    <div className="py-1">
                      Address:
                      <span className="text-gray-500">
                        &emsp;{contact.address}
                      </span>
                    </div>
                    <div className="py-1">
                      Status:
                      <span className="text-gray-500">
                        &emsp;&emsp;
                        <span
                          className={`px-3 rounded-full align-middle py-1 ${
                            contact.status === "active"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewDialog;
