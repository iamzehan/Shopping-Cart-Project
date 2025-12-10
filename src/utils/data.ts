export interface Product{
    id:number;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    }
}
export interface CartProduct extends Product{
  quantity: number;
}

export async function getDataById(id:number){
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data:Product = await response.json();
    return data;
}

export async function getData(start: number, end: number) {
  return Promise.all(
    Array.from({ length: end - start + 1 }, (_, idx) =>
      getDataById(start + idx)
    )
  );
}

export function getLocalData():string|null{
  const data = localStorage.getItem("cartItems");
  if(!data){
    localStorage.setItem("cartItems", JSON.stringify([]));
    return localStorage.getItem("cartItems");
  }
  return data;
}
export function setLocalData(prevData:CartProduct[], newData:CartProduct){
  prevData.push(newData);
  const latestData = [...prevData]
  localStorage.setItem("cartItems", JSON.stringify(latestData));
}
export  function addToCart(data:CartProduct){
  const localData:string|null = getLocalData();
  if (localData) setLocalData(JSON.parse(localData), data);
}

export function getLength(){
  const data = localStorage.getItem("cartItems");
  if (data){
    return JSON.parse(data).length
  }
}