import { createContext, useContext, useEffect, useState } from "react";
import { List } from "../providers/storage/functions/UserStorageFunctions";
import { Category } from "../providers/storage/functions/CategoryFunctions";
import { Brand } from "../providers/storage/functions/BrandFunctions";
import { Product } from "../providers/storage/functions/ProductFunctions";
import Storage from "../providers/storage/storage";

export interface DataStorage {

    category: Category[],
    brand: Brand[],
    product: Product[],

}

export const DataStorage = createContext({});

export const useDataStorage = () => {

    return useContext(DataStorage) as { dataStorage: DataStorage, setDataStorage: any };

};

export const StorageDataProvider = ({ children }:any) => {

    const [ dataStorage, setDataStorage ] = useState<DataStorage>({

        category: Storage.Category.getMany(),
        brand: Storage.Brand.getMany(),
        product: Storage.Product.getMany(),

    })

    // setDataStorage(()=>{
    //     return {
    //         category: Storage.Category.getMany(),
    //         brand: Storage.Brand.getMany(),
    //         product: Storage.Product.getMany(),
    //     }
    // })


    // const [ category, setCategory ] = useState<Category[]>()
    // const [ brand, setBrand ] = useState<Brand[]>()
    // const [ product, setProduct ] = useState<Product[]>()
    

    useEffect(()=>{


    },[dataStorage])



    return (

        <DataStorage.Provider value={{ dataStorage, setDataStorage }}>
            {children}
        </DataStorage.Provider>
        
    )

}