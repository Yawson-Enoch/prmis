import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { appReducer } from './appReducer';

export interface INotification {
  active: boolean;
  title: 'success' | 'error' | null;
  description: string | null;
  style: 'success' | 'error' | null;
}
export interface IConfirmDialog {
  active: boolean;
  type: 'logOut' | 'deleteUser' | null;
  description: string | null;
}

export type ActionTypes =
  | { type: 'NOTIFICATION'; payload: INotification }
  | { type: 'CONFIRM_DIALOG'; payload: IConfirmDialog }
  | { type: 'SHOW_BACKDROP'; payload: boolean }
  | { type: 'API_PATIENT_ID'; payload: string | null }
  | { type: 'SHOW_PATIENT_DETAILS_EDIT_FORM'; payload: boolean };

export interface IAppState {
  notification: INotification;
  confirmDialog: IConfirmDialog;
  showBackdrop: boolean;
  showPatientDetailsEditForm: boolean;
  apiPatientId: string | null;
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
    title: null,
    description: null,
    style: null,
  },
  confirmDialog: {
    active: false,
    type: null,
    description: null,
  },
  showBackdrop: false,
  showPatientDetailsEditForm: false,
  apiPatientId: null,
};

const AppContextProvider = ({ children }: IAppContextProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    if (state.notification.active) {
      const timer = setTimeout(() => {
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            active: false,
            title: null,
            description: null,
            style: null,
          },
        });
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [state.notification.active]);

  useEffect(() => {
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            active: false,
            title: null,
            description: null,
            style: null,
          },
        });
        dispatch({
          type: 'SHOW_BACKDROP',
          payload: false,
        });
        dispatch({
          type: 'CONFIRM_DIALOG',
          payload: {
            active: false,
            description: null,
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
