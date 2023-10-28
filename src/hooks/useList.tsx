import { useContext } from "react";
import { DataStorage, DataStorageContext, DataStorageProvider } from "../context/StorageDataProvider";
import { ListContext, ListContextType } from "../context/ListProvider";



export default function useList() {

    return useContext(ListContext)

}
