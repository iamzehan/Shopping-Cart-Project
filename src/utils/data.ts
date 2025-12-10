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

