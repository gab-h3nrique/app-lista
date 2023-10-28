import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import Storage from "../providers/storage/storage";
import { List } from "../providers/storage/functions/UserStorageFunctions";


interface Props {

    children: ReactNode

}

export interface ListContextType {

    list: List[],
    saveList: (list: List[])=> void,
    selectedList: List | null,
    saveSelectedList: (list: List)=> void,

}

export const ListContext = createContext({} as ListContextType);

export default function ListProvider({ children }: Props) {

  const [ list, setList ] = useState(Storage.List.getMany());
  const [ selectedList, setSelectedList ] = useState<List | null>(null);


  const saveList = useCallback((list: List[]) => {

    setList(()=> list)

  }, []);

  const deleteList = useCallback((id: number) => {

    const isRemoved = Storage.List.delete(id)

    if(!isRemoved) return console.error('list was not removed')

    setList(prev=> prev.filter(e=> e.id !== id))

  }, []);


  const saveSelectedList = useCallback((list: List) => {

    setSelectedList(()=> list)

  }, []);

  const contextValue = useMemo(() => ({

    list,
    saveList,
    selectedList,
    saveSelectedList

  }), [list, saveList, selectedList, saveSelectedList]);


  return (

    <ListContext.Provider value={contextValue}>
        {children}
    </ListContext.Provider>

  )
}


export const useList = () => useContext(ListContext)
