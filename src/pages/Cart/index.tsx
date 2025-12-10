import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartBody from "./CartBody";
import { useEffect, useState } from "react";
import { getLocalData, type CartProduct } from "../../utils/data";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

export default function Cart() {
  const [data, setData] = useState<CartProduct[] | null>(null);
  useEffect(() => {
    const loadData = async () => {
      const localData: string | null = await getLocalData();
      const parsedData: CartProduct[] = localData
        ? JSON.parse(localData)
        : null;
      setData(parsedData);
    };
    loadData();
  }, []);

  function handleDelete(id: number) {
    const newData = data?.filter((product) => product.id !== id);

    if (newData) {
      setData(newData);
      localStorage.setItem("cartItems", JSON.stringify(newData));
    }
  }

  if (!data || data.length===0) {
    return (
      <div className="flex flex-col h-[80vh] justify-center items-center gap-2 text-gray-400 w-full dark:text-gray-400/50">
        <p className="text-4xl">Cart is empty</p>
        <ProductionQuantityLimitsIcon fontSize="large" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="text-3xl flex font-bold items-center gap-2">
        Cart
        <ShoppingCartIcon fontSize="large" />
      </p>
      <div className="flex flex-col w-full">
        {" "}
        <table className="*:not-first:border-b">
          <tr className="text-center h-10">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          {data?.map((product) => (
            <CartBody
              key={product.id}
              data={product}
              handleDelete={handleDelete}
            />
          ))}
        </table>
      </div>
    </div>
  );
}
