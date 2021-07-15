import React , {createContext, useContext, useReducer} from 'react';

const Store = createContext();
Store.displayName = 'Store';

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children, initialState, reducer }) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={[globalState, dispatch]} displayName="Game Context">{children}</Store.Provider>
  );
};