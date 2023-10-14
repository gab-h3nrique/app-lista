import { MMKV } from 'react-native-mmkv'

export const storageProvider = new MMKV();






//###################### LIST ######################//
const LISTS = 'USER_LISTS';

export interface List {
    id: number; 
    name: string; 
    itens: Item[];
    checked: boolean; 
    updatedAt?: any;
    createdAt?: any;
}

export interface Item {
    id: number; 
    name: string; 
    price: number; 
    quantity: number; 
    checked: boolean; 
    image?: string;
    updatedAt?: any;
    createdAt?: any;
    productId?: number | null;
}

export const EmptyItem: Item = { id: -1, name: '', price: 0, quantity: 0, checked: false, image: '', productId: -1, }

function listFunctions() {

    const getAllLists = (): List[] => JSON.parse(storageProvider.getString(LISTS) || "[]")

    const getListById = (id: number): List | null => JSON.parse(storageProvider.getString(LISTS) || "[]").find((e: List)=> e.id === id) || null
    
    const setLists = (arrayList: List[]) =>  storageProvider.set(LISTS, JSON.stringify(arrayList))
    
    return {

        get(id: number):List | null {

            try {

                return getListById(id) || null

            } catch(error) { console.log('erro in get list on storage', error); return null}

        },

        getMany(name?: string): List[] {
            
            try {

                const data = getAllLists()
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.log('erro in getMany list on storage', error); return []}

        },

        create(list: {name: string, itens?: Item[], checked: boolean}):List | null {

            try {

                const data = getAllLists()
    
                const repeatedName = data.filter(li=>li.name.includes(list.name))
    
                const id = new Date().getTime()

                const notRepeatedName = `${list.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newList = { 
                    ...list,
                    id: id,
                    name: notRepeatedName,
                    itens: [],
                    checked: list.checked,
                    updatedAt: new Date().getTime(),
                    createdAt: new Date().getTime(),
                }
    
                setLists([newList, ...data])
    
                return getListById(id)

            } catch(error) { console.log('erro in create list on storage', error); return null}

        },

        update(list: List):List | null {

            try {

                const data = getAllLists()
    
                const newList: List[] = [];
                const newDate = new Date().getTime()
    
                data.forEach(e => {
                    if(e.id === list.id) newList.push({...list, id: e.id, updatedAt: newDate})
                    else newList.push(e)
                });
    
                setLists(newList)
    
                return getListById(list.id)

            } catch(error) { console.log('erro in update list on storage', error); return null}

        },

        delete(id: number): boolean {

            try {

                const data = getAllLists()
    
                setLists(data.filter((e: any)=> e.id !== id))
    
                return !getListById(id) ? true : false;

            } catch(error) { console.log('erro in delete list on storage', error); return false}

        },

        getByName(name: string): List[] {

            try{

                const data =  getAllLists()
    
                return data.filter(li=> li.name.includes(name))

            } catch(error) { console.log('erro in getByName list on storage', error); return []}

        },

        getItens(listId: number): Item[] | null {

            try {

                const list = getListById(listId)

                if(!list) return null

                return list.itens || []

            } catch(error) { console.log('erro in get list on storage', error); return null}

        },

        createItem(listId: number, item: Item):Item | null {

            try {

                const data = getAllLists()

                const list = getListById(listId)

                if(!list) return null
                
                const id = new Date().getTime()

                const newItem:Item = {
                    id: id,
                    name: item.name,
                    quantity: item.quantity || 0,
                    price: item.price,
                    checked: false,
                    updatedAt: new Date().getTime(),
                    createdAt: new Date().getTime(),
                    productId: item.productId ? item.productId : -1,
                }

                list.itens.unshift(newItem)

                const newList: List[] = [];

                data.forEach(li => {
                    if(li.id === list.id) newList.push(list)
                    else newList.push(li)
                });
    
                setLists(newList)

                return newItem

            } catch(error) { console.log('erro in create new item', error); return null}

        },

        deleteItem(listId: number, itemId: number):boolean {

            try {

                const data = getAllLists()

                const list = getListById(listId)

                if(!list) return false
                
                const newItens = list.itens.filter((e)=> e.id !== itemId)

                list.itens = newItens

                const newList: List[] = [];

                data.forEach(li => {
                    if(li.id === list.id) newList.push(list)
                    else newList.push(li)
                });
    
                setLists(newList)

                return true

            } catch(error) { console.log('erro in delete an item', error); return false}

        },

    }
}
//###################### LIST ######################//


//#################### CATEGORIES | PRODUCTS ####################//

const CATEGORIES =  'CATEGORIES';
const BRANDS =      'BRANDS';
const PRODUCTS =    'PRODUCTS';

export interface Category {
    id: number;
    name: string;
    image?: string;
}

export interface Brand {
    id: number;
    name: string;
    image?: string;
}

export interface Product {
    id: number;
    name: string;
    categoryId?: number;
    brandId?: number;
    price?: number;
    image?: string;
}

export const EmptyCategory: Category = { id: -1, name: ''}
export const EmptyBrand: Brand = { id: -1, name: ''}
export const EmptyProduct: Product = { id: -1, name: '', price: 0}

function categoriesFunctions() {

    const getAllCategories = (): Category[] => JSON.parse(storageProvider.getString(CATEGORIES) || "[]")

    const getCategoryById = (id: number): Category | null => JSON.parse(storageProvider.getString(CATEGORIES) || "[]").find((e: Category)=> e.id === id) || null
    
    const setCategory = (arrayCategory: Category[]) =>  storageProvider.set(CATEGORIES, JSON.stringify(arrayCategory))


    return {

        get(id: number):Category | null {

            try {

                return getCategoryById(id) || null

            } catch(error) { console.log('erro in get category on storage', error); return null}

        },

        getMany(name?: string): Category[] {
            
            try {

                const data = getAllCategories()
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.log('erro in get list on storage', error); return []}

        },

        create(category: { name: string, image?: string}): Category | null {

            try{

                const data = getAllCategories()

                const repeatedName = data.filter(li=>li.name.includes(category.name))

                const id = new Date().getTime()

                const notRepeatedName = `${category.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newCategory = { ...category, id: id,name: notRepeatedName }

                setCategory([newCategory, ...data])

                return getCategoryById(id)

            } catch(error) { console.log('erro in create category on storage', error); return null }

        },

        update(category: Category):Category | null {

            try {

                const data = getAllCategories()
    
                const newCategories: Category[] = [];
    
                data.forEach(e => {
                    if(e.id === category.id) newCategories.push({...category, id: e.id})
                    else newCategories.push(e)
                });
    
                setCategory(newCategories)
    
                return getCategoryById(category.id)

            } catch(error) { console.log('erro in update category on storage', error); return null }

        },

        delete(id: number): boolean {

            try {

                const data = getAllCategories()
    
                setCategory(data.filter((e: Category)=> e.id !== id))
    
                return !getCategoryById(id) ? true : false;

            } catch(error) { console.log('erro in update delete on storage', error); return false }


        },

        getByName(name: string): Category[] {
            
            try{
                
                const data =  getAllCategories()
    
                return data.filter(li=> li.name.includes(name))

            } catch(error) { console.log('erro in update category on storage', error); return [] }

        },

    }

}

function BrandFunctions() {

    const getAllBrands = (): Brand[] => JSON.parse(storageProvider.getString(BRANDS) || "[]")

    const getBrandById = (id: number): Brand | null => JSON.parse(storageProvider.getString(BRANDS) || "[]").find((e: Brand)=> e.id === id) || null
    
    const setBrand = (arrayProduct: Brand[]) =>  storageProvider.set(BRANDS, JSON.stringify(arrayProduct))


    return {

        get(id: number):Brand | null {

            try {

                return getBrandById(id) || null

            } catch(error) { console.log('erro in get brand on storage', error); return null}

        },

        getMany(name?: string): Brand[] {
            
            try {

                const data = getAllBrands()
    
                if(name) return data.filter(br => br.name.includes(name))
                
                return data

            } catch(error) { console.log('erro in getMany brand on storage', error); return []}

        },

        create(brand: { name: string, image?: string}):Brand | null {

            try {

                const data = getAllBrands()
    
                const repeatedName = data.filter(e=>e.name.includes(brand.name))
    
                const id = new Date().getTime()

                const notRepeatedName = `${brand.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newBrand = { ...brand, id: id,name: notRepeatedName }
    
                setBrand([newBrand, ...data])
    
                return getBrandById(id)

            } catch(error) { console.log('erro in create brand on storage', error); return null }


        },

        update(brand: Brand):Brand | null {

            try {
    
                const data = getAllBrands()
    
                const newCategories: Brand[] = [];
    
                data.forEach(e => {
                    if(e.id === brand.id) newCategories.push({...brand, id: e.id})
                    else newCategories.push(e)
                });
    
                setBrand(newCategories)
    
                return getBrandById(brand.id)

            } catch(error) { console.log('erro in update brand on storage', error); return null }

        },

        delete(id: number): boolean {

            try {

                const data = getAllBrands()
    
                setBrand(data.filter((e: Brand)=> e.id !== id))
    
                return !getBrandById(id) ? true : false;

            } catch(error) { console.log('erro in delete brand on storage', error); return false }

        },

        getByName(name: string): Category[] {

            try {

                const data =  getAllBrands()
    
                return data.filter(e=> e.name.includes(name))

            } catch(error) { console.log('erro in getByName brand on storage', error); return [] }

        },

    }

}

function ProductFunctions() {

    const getAllProducts = (): Product[] => JSON.parse(storageProvider.getString(PRODUCTS) || "[]")

    const getProductById = (id: number): Product | null => JSON.parse(storageProvider.getString(PRODUCTS) || "[]").find((e: Product)=> e.id === id) || null
    
    const setProduct = (arrayProduct: Product[]) =>  storageProvider.set(PRODUCTS, JSON.stringify(arrayProduct))

    const getCategoryById = (id: number): Category | null => JSON.parse(storageProvider.getString(CATEGORIES) || "[]").find((e: Category)=> e.id === id) || null

    return {

        get(id: number):Product | null {

            try {

                return getProductById(id) || null

            } catch(error) { console.log('erro in get product on storage', error); return null}

        },

        getMany(name?: string): Product[] {
            
            try {

                const data = getAllProducts()
    
                if(name) return data.filter(e => e.name.includes(name))
                
                return data

            } catch(error) { console.log('erro in getMany product on storage', error); return []}

        },

        create(product: { name: string, categoryId?: number, brandId?:number, price?: number, image?: string}): Product | null {

            try {

                const data = getAllProducts()
    
                const repeatedName = data.filter(e=>e.name.includes(product.name))
    
                const id = new Date().getTime()
    
                const notRepeatedName = `${product.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newProduct = { ...product, id: id,name: notRepeatedName }
    
                setProduct([newProduct, ...data])
    
                return getProductById(id)

            } catch(error) { console.log('erro in get product on storage', error); return null}


        },

        update(product: Product): Product | null {

            try {

                const data = getAllProducts()
    
                const newProduct: Product[] = [];
    
                data.forEach(e => {
                    if(e.id === product.id) newProduct.push({...product, id: e.id})
                    else newProduct.push(e)
                });
    
                setProduct(newProduct)
    
                return getProductById(product.id)

            } catch(error) { console.log('erro in update product on storage', error); return null}

        },

        delete(id: number): boolean {

            try {

                const data = getAllProducts()
    
                setProduct(data.filter((e: Product)=> e.id !== id))
    
                return !getProductById(id) ? true : false;

            } catch(error) { console.log('erro in update product on storage', error); return false}

        },

        getByName(name: string): Product[] {

            try {

                const data =  getAllProducts()

                return data.filter(e=> e.name.includes(name))

            } catch(error) { console.log('erro in update product on storage', error); return []}

        },

        getByCategory(categoryId: number): Product[] {

            try {

                const data =  getAllProducts()

                return data.filter(e=> e.categoryId === categoryId)

            } catch(error) { console.log('erro in update getByCategory on storage', error); return []}

        },

        createMany(products: Product[], categoryId?: number): Product[] | null {
            
            try{

                const data = getAllProducts()

                const newProducts: Product[] = [];
    
                products.forEach((e) => {

                    const id = new Date().getTime() + parseInt(String(Math.random() * 9999999))

                    newProducts.push({...e, id: id, categoryId: categoryId || e.categoryId })

                });
    
                setProduct([...newProducts, ...data])
    
                return newProducts

            } catch(error) { console.log('erro in update createManyProducts on storage', error); return [] }

        },

    }

}



//#################### CATEGORIES | PRODUCTS ####################//








export const Storage = {

    List: listFunctions(),
    Category: categoriesFunctions(),
    Brand: BrandFunctions(),
    Product: ProductFunctions(),

}







console.warn('-------------------------renderizando app')

storageProvider.clearAll()

storageProvider.set('CATEGORIES', JSON.stringify([
  {id: 1, name:'Pães', image: 'https://cdn-icons-png.flaticon.com/512/4670/4670821.png'},
  {id: 2, name:'Lácteos', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png'},
  {id: 3, name:'Frutas e legumes', image: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png'},
]))

storageProvider.set('PRODUCTS', JSON.stringify([

  {id: 1, name: 'Pão Francês  400g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/3014/3014538.png'},
  {id: 2, name: 'Pão Francês Tradicional 400g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/2215/2215883.png'},
  {id: 3, name: 'Pão de forma Pullman 480g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/2215/2215883.png'},
  {id: 4, name: 'Pão de Forma Visconti 400g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/5411/5411390.png'},
  {id: 5, name: 'Bisnaguinha 350g', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/3245/3245145.png'},
  {id: 6, name: 'Pão de queijo congelado, 1kg', categoryId: 1, image: 'https://cdn-icons-png.flaticon.com/512/347/347315.png'},

  {id: 7, name: 'Iorgute integral 200g', categoryId: 2, image: 'https://cdn-icons-png.flaticon.com/512/2689/2689423.png'},
  {id: 8, name: 'Requeijão cremoso 150g', categoryId: 2, image: ''},
  {id: 9, name: 'Queijo cheedar fatiado 100g', categoryId: 2, image: ''},
  {id: 10, name: 'Cream cheese culinário 1kg', categoryId: 2, image: ''},
  {id: 11, name: 'Queijo prato aparas 1kg', categoryId: 2, image: ''},
  {id: 12, name: 'Manteiga sem sal 200g', categoryId: 2, image: ''},

  {id: 13, name: 'Abacaxi', categoryId: 3, image: ''},
  {id: 14, name: 'Laranja', categoryId: 3, image: ''},
  {id: 15, name: 'Banana', categoryId: 3, image: ''},
  {id: 16, name: 'Limão', categoryId: 3, image: ''},
  {id: 17, name: 'Mamão', categoryId: 3, image: ''},
  {id: 18, name: 'Melão', categoryId: 3, image: ''},
  {id: 19, name: 'Maçã', categoryId: 3, image: ''},
  {id: 20, name: 'Abóbora', categoryId: 3, image: ''},
  {id: 21, name: 'Abobrinha', categoryId: 3, image: ''},
  {id: 22, name: 'Batata', categoryId: 3, image: ''},
  {id: 23, name: 'Tomate', categoryId: 3, image: ''},
  {id: 24, name: 'Cebola', categoryId: 3, image: ''},
  {id: 25, name: 'Alho', categoryId: 3, image: ''},
  {id: 26, name: 'Cenoura', categoryId: 3, image: ''},
  {id: 27, name: 'Pepino', categoryId: 3, image: ''},
  {id: 28, name: 'Beterraba', categoryId: 3, image: ''},
  {id: 29, name: 'Vagem', categoryId: 3, image: ''},
  {id: 30, name: 'Berinjela', categoryId: 3, image: ''},
  {id: 31, name: 'Chuchu', categoryId: 3, image: ''},
  {id: 32, name: 'Alface', categoryId: 3, image: ''},
  {id: 33, name: 'Brócolis', categoryId: 3, image: ''},
  {id: 34, name: 'Rúcula', categoryId: 3, image: ''},
  {id: 35, name: 'Uvas', categoryId: 3, image: ''},

]))