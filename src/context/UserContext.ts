import { createContext } from 'react';
import { UserDetail } from '../utils/common.type';

const UserContext = createContext<{
  currentUser: UserDetail | null;
  setCurrentUser: (arg: UserDetail | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}>({} as any);

export default UserContext;
