import { useNavigate } from "react-router-dom";
import { IContact } from "../../Models";

interface Props {
  contact: IContact;
  openDeleteModal: (contact: IContact) => void;
  openViewModal: (contact: IContact) => void;
}

const ContactCard = ({ contact, openDeleteModal, openViewModal }: Props) => {
  const navigateTo = useNavigate();
  
  return (
    <div>
      <div className="w-96 h-56 border flex flex-row border-gray-200 rounded-lg shadow-md cursor-pointer" 
      onClick={() => openViewModal(contact)}
      >
        <div className="w-1/3 bg-[#F0564F] rounded-s-md p-4">
          <img
            src={contact.image}
            alt="profile"
            className="w-20 h-20 my-3 mx-auto rounded-full object-cover"
          />
          <div className="text-white font-semibold text-xl">{contact.name}</div>
        </div>
        <div className="w-2/3 rounded-e-md py-5 h-full">
          <div className="font-medium py-1 px-2">
            Email:
            <div className="text-gray-500">{contact.email}</div>
          </div>
          <div className="font-medium py-1 px-2">
            Phone: <div className="text-gray-500">{contact.phone}</div>
          </div>
          <div className="font-medium py-1 px-2">
            Address : <div className="text-gray-500">{contact.address}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full my-4">
        <div
          className="cursor-pointer border-gray-200 border-2 rounded-md w-[calc(50%-0.25rem)] py-1 text-center"
          onClick={() =>
            navigateTo(`/editcontact/${contact.id}`, { state: contact })
          }
        >
          Edit
        </div>
        <div
          className="cursor-pointer border-gray-200 bg-[#F0564F] text-white rounded-md w-[calc(50%-0.25rem)] py-1 text-center"
          onClick={() => openDeleteModal(contact)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
