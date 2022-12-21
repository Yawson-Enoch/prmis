export interface IReqPatient {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  gender: string;
  image: string;
}

export interface IResPatient extends IReqPatient {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISinglePatientResData {
  message: string;
  patient: IResPatient;
}

export interface IAllPatientsResData {
  message: string;
  patients: IResPatient[];
}

export interface IMessageFromResData {
  message: string;
}
