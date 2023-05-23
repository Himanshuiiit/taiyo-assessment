import { IAction, IContact } from "../../Models";
import { ADD_CONTACT } from "../Actions/ContactActions";
import { REMOVE_CONTACT } from "../Actions/ContactActions";
import { UPDATE_CONTACT } from "../Actions/ContactActions";

const initialState: IContact[] = [
  {
    id: 1,
    name: "Himanshu Verma",
    email: "hims6482@gmail.com",
    phone: "8789390670",
    address: "B-1/2, Sector-18, Rohini, Delhi-110089",
    image:
      "https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1684748244~exp=1684748844~hmac=d09ea1837fd1678b40f161d92bb4b4185daae47c27a71014459aa8c5fa9be2aa",
    status: "active",
  },
];

export const ContactReducer = (
  state: IContact[] = initialState,
  action: IAction
) => {
  switch (action.type) {
    case ADD_CONTACT:
      return [...state, action.payload];
    case REMOVE_CONTACT:
      return state.filter((contact) => contact.id !== action.payload);
    case UPDATE_CONTACT:
      return state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
    default:
      return state;
  }
};
