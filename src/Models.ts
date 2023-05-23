export interface IContact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  status: string;
}

export interface IAction {
  type: string;
  payload?: any;
}

