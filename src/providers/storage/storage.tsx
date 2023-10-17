import AsyncStorageFunctions from "./functions/AsyncStorageFunctions"
import BrandFunctions from "./functions/BrandFunctions"
import CategoryFunctions from "./functions/CategoryFunctions"
import ProductFunctions from "./functions/ProductFunctions"
import { ListFunctions, itemFunctions } from "./functions/UserStorageFunctions"



const Storage = {

    storage: AsyncStorageFunctions,

    Category: CategoryFunctions,
    Brand: BrandFunctions,
    Product: ProductFunctions,
    List: ListFunctions,
    Item: itemFunctions,

}

console.debug('-------------------------renderizando app')

Storage.storage.setItem('CATEGORIES', 
    [
        {id: 1, name:'Pães', image: 'https://cdn-icons-png.flaticon.com/512/4670/4670821.png'},
        {id: 2, name:'Lácteos', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png'},
        {id: 3, name:'Frutas e legumes', image: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png'},
        {id: 4, name:'Frutas e legumes', image: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png'},
    ]
)

export default Storage