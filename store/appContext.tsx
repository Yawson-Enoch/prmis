import { appReducer } from './appReducer';
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

export interface INotification {
  active: boolean;
  title: 'success' | 'info' | 'warning' | 'error';
  description: string;
  style: 'success' | 'info' | 'warning' | 'error';
}
export interface IConfirmDialog {
  active: boolean;
  type: 'logOut' | 'deleteUser' | null;
  description: string;
}

export type ActionTypes =
  | { type: 'NOTIFICATION'; payload: INotification }
  | { type: 'CONFIRM_DIALOG'; payload: IConfirmDialog }
  | { type: 'SHOW_BACKDROP'; payload: boolean }
  | { type: 'API_PATIENT_ID'; payload: string }
  | { type: 'SHOW_PATIENT_DETAILS_EDIT_FORM'; payload: boolean };

export interface IAppState {
  notification: INotification;
  confirmDialog: IConfirmDialog;
  showBackdrop: boolean;
  showPatientDetailsEditForm: boolean;
  apiPatientId: string;
}

interface IAppContextProps {
  state: IAppState;
  dispatch: Dispatch<ActionTypes>;
}

interface IAppContextProviderProps {
  children: ReactNode;
}

const AppContext = createContext({} as IAppContextProps);

const initialAppState: IAppState = {
  notification: {
    active: false,
    title: 'info',
    description: '',
    style: 'info',
  },
  confirmDialog: {
    active: false,
    type: null,
    description: '',
  },
  showBackdrop: false,
  showPatientDetailsEditForm: false,
  apiPatientId:
    (typeof localStorage !== 'undefined' &&
      localStorage.getItem('apiPatientId')) ||
    '',
};

const AppContextProvider = ({ children }: IAppContextProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    if (state.notification.active) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            style: state.notification.style,
            active: false,
            title: 'info',
            description: '',
          },
        });
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [state.notification.active, state.notification.style]);

  useEffect(() => {
    localStorage.setItem('apiPatientId', state.apiPatientId);
  }, [state.apiPatientId]);

  useEffect(() => {
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        dispatch({
          type: 'SHOW_BACKDROP',
          payload: false,
        });
        dispatch({
          type: 'CONFIRM_DIALOG',
          payload: {
            active: false,
            description: '',
            type: null,
          },
        });
        dispatch({
          type: 'SHOW_PATIENT_DETAILS_EDIT_FORM',
          payload: false,
        });
      }
    });
    return () => {
      window.removeEventListener;
    };
  }, []);

  const appContextValues = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={appContextValues}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppContextProvider };
