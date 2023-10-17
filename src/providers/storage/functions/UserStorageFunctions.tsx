import AsyncStorageFunctions from './AsyncStorageFunctions';

const LISTS =  'USER_LISTS';
const ITENS =  'USER_ITENS';

export interface List {
    id: number; 
    name: string; 
    itens?: Item[];
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
    listId?: number | null;
    productId?: number | null;
}


function functionList() {

    const SET = (array: List[]) => AsyncStorageFunctions.setItem(LISTS, array);

    const GET_ALL = (): List[] => AsyncStorageFunctions.getItem(LISTS) || [];

    const GET_BY_ID = (id: number): List | null => GET_ALL().find((e: List)=> e.id === id) || null;

    const GET_ALL_ITENS = (): Item[] => AsyncStorageFunctions.getItem(ITENS)

    const GET_BY_LIST_ID = (id : number): Item[] => AsyncStorageFunctions.getItem(ITENS).filter((e: Item)=> e.listId === id)

    return {

        get(id: number):List | null {

            try {

                const list = GET_BY_ID(id)

                if(!list) return null

                return {...list, itens: GET_BY_LIST_ID(id) }

            } catch(error) { console.log('erro in get list on storage', error); return null}

        },

        getMany(name?: string): List[] {

            try {

                const data = GET_ALL()

                let filteredList: List[];

                if(name) filteredList = data.filter((e)=> e.name.includes(name))
                else filteredList = data

                const newList = filteredList.map((e)=> { return {...e, itens: GET_BY_LIST_ID(e.id)} })

                return newList

            } catch(error) { console.log('erro in getMany list on storage', error); return []}

        },

        create(list: { name: string, checked: boolean}): List | null {

            try{

                const data = GET_ALL()

                const repeatedName = data.filter(li=>li.name.includes(list.name))

                const id = new Date().getTime()

                const notRepeatedName = `${list.name}${ repeatedName.length + 1 > 1 ? ` (${repeatedName.length + 1})` : ''}`

                const newList = { 
                    ...list,
                    id: id,
                    name: notRepeatedName,
                    checked: list.checked,
                    updatedAt: new Date().getTime(),
                    createdAt: new Date().getTime(),
                }

                SET([newList, ...data])

                return GET_BY_ID(id)

            } catch(error) { console.log('erro in create list on storage', error); return null }

        },

        update(id: number, list: List): List | null {

            try {

                const data = GET_ALL()

                const newDate = new Date().getTime()
    
                SET(data.map((e)=> e.id === id ? {...list, id: e.id, updatedAt: newDate, itens: []} : e))
    
                return GET_BY_ID(id)

            } catch(error) { console.log('erro in update list on storage', error); return null }

        },

        delete(id: number): boolean {

            try {

                const data = GET_ALL()
    
                SET(data.filter((e: List)=> e.id !== id))
    
                return !GET_BY_ID(id) ? true : false;

            } catch(error) { console.log('erro in delete List on storage', error); return false }


        },

    }

}

function functionItem() {

    const SET = (array: Item[]) => AsyncStorageFunctions.setItem(ITENS, array);

    const GET_ALL = (): Item[] => AsyncStorageFunctions.getItem(ITENS) || [];

    const GET_BY_ID = (id: number): Item | null => GET_ALL().find((e: Item)=> e.id === id) || null;


    return {

        get(id: number):Item | null {

            try {

                return GET_BY_ID(id) || null

            } catch(error) { console.log('erro in get Item on storage', error); return null}

        },

        getMany(name?: string): Item[] {
            
            try {

                const data = GET_ALL()
    
                if(name) return data.filter(li => li.name.includes(name))
                
                return data

            } catch(error) { console.log('erro in get Item on storage', error); return []}

        },

        create(item: Item): Item | null {

            try{

                const data = GET_ALL()
    
                const id = new Date().getTime()

                const newItem: Item = { ...item, id: id,  updatedAt: new Date().getTime(), createdAt: new Date().getTime() }
    
                SET([newItem, ...data])
    
                return GET_BY_ID(id)

            } catch(error) { console.log('erro in create Item on storage', error); return null }

        },

        update(id: number, item: Item): Item | null {

            try {

                const data = GET_ALL()

                const newDate = new Date().getTime()
    
                SET(data.map((e)=> e.id === id ? {...item, id: e.id, updatedAt: newDate} : e))
    
                return GET_BY_ID(id)

            } catch(error) { console.log('erro in update Item on storage', error); return null }

        },

        delete(id: number): boolean {

            try {

                const data = GET_ALL()
    
                SET(data.filter(e=> e.id !== id))
    
                return !GET_BY_ID(id) ? true : false;

            } catch(error) { console.log('erro in delete Item on storage', error); return false }


        },

        getByName(name: string): Item[] {
            
            try{
                
                const data = GET_ALL()
    
                return data.filter(li=> li.name.includes(name))

            } catch(error) { console.log('erro in update Item on storage', error); return [] }

        },

    }

}

export const ListFunctions = functionList()
export const itemFunctions = functionItem()