import { createContext, useContext, useEffect, useState } from "react";
import { List } from "../providers/storage/functions/UserStorageFunctions";
import { Category } from "../providers/storage/functions/CategoryFunctions";
import { Brand } from "../providers/storage/functions/BrandFunctions";
import { Product } from "../providers/storage/functions/ProductFunctions";
import Storage from "../providers/storage/storage";

interface Data {

    Category: Category[],
    Brand: Brand[],
    Product: Product[],

}

export const DataStorage = createContext({});

export const useDataStorage = () => {

    return useContext(DataStorage) as { dataStorage: Data, setDataStorage: any };

};

export const StorageDataProvider = ({ children }:any) => {

    const [ dataStorage, setDataStorage ] = useState<Data>({

        Category: Storage.Category.getMany(),
        Brand: Storage.Brand.getMany(),
        Product: Storage.Product.getMany(),

    })


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