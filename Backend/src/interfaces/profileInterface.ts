export interface ProfileCreate {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  email: string;
}

export interface ProfilePatch {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  email: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  email: string;
}
