import { IContact } from "../../Models";

export const ADD_CONTACT = "ADD_CONTACT";
export const REMOVE_CONTACT = "REMOVE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";

export const addContact = (contact: IContact) => {
  return {
    type: ADD_CONTACT,
    payload: contact,
  };
};

export const removeContact = (id: number) => {
  return {
    type: REMOVE_CONTACT,
    payload: id,
  };
};

export const updateContact = (contact: IContact) => {
  return {
    type: UPDATE_CONTACT,
    payload: contact,
  };
};
