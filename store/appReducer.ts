import { ActionTypes, IAppState } from './appContext';

export const appReducer = (
  state: IAppState,
  action: ActionTypes
): IAppState => {
  switch (action.type) {
    case 'NOTIFICATION': {
      return { ...state, notification: action.payload };
    }
    case 'SHOW_BACKDROP': {
      return { ...state, showBackdrop: action.payload };
    }
    case 'SHOW_PATIENT_DETAILS_EDIT_FORM': {
      return { ...state, showPatientDetailsEditForm: action.payload };
    }
    case 'API_PATIENT_ID': {
      return { ...state, apiPatientId: action.payload };
    }
    case 'CONFIRM_DIALOG': {
      return { ...state, confirmDialog: action.payload };
    }
    default: {
      throw new Error('Action not found.');
    }
  }
};
