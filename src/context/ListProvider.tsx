import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import Storage from "../providers/storage/storage";
import { List } from "../providers/storage/functions/UserStorageFunctions";

interface Props {

    children: ReactNode

}

export interface ListContextType {

  list: List[],
  saveList: (list: List[])=> void,

}

export const ListContext = createContext({} as ListContextType);

export default function ListProvider({ children }: Props) {

  const [ list, setList ] = useState(Storage.List.getMany());

  // const saveList = useCallback((list: List[]) => setList(()=> list), []);
  
  // const contextValue = useMemo(() => ({
    
    //   list,
    //   saveList,
    
    // }), [list]);
    
  const saveList = (list: List[]) => setList(()=> list);
  const contextValue = {

    list,
    saveList,

  }

  return (

    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>

  )
}


