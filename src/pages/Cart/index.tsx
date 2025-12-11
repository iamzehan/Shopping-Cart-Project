import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState, lazy, Suspense } from "react";
import { getLocalData, type CartProduct } from "../../utils/data";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { useOutletContext } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
const CartItem = lazy(() => import("../../components/CartItem"));
type OutletCtx = {
  setItemsNumber: React.Dispatch<React.SetStateAction<number>>;
};
export default function Cart() {
  const { setItemsNumber } = useOutletContext<OutletCtx>();
  const [data, setData] = useState<CartProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const localData: string | null = getLocalData();
      const parsedData: CartProduct[] = localData
        ? JSON.parse(localData)
        : null;
      setData(parsedData);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!data) return;
    setItemsNumber(data.length);
  }, [data, setItemsNumber]);

  function handleDelete(id: number) {
    const newData = data?.filter((product) => product.id !== id);

    if (newData) {
      setData(newData);
      localStorage.setItem("cartItems", JSON.stringify(newData));
    }
  }
  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col h-[80vh] justify-center items-center gap-2 text-gray-400 w-full dark:text-gray-400/50">
        <p className="text-4xl">Cart is empty</p>
        <ProductionQuantityLimitsIcon fontSize="large" />
      </div>
    );
  }

  return (
    <div className="md:mt-10 flex flex-col gap-5 items-center">
      <p className="text-3xl flex font-bold items-center gap-2">
        Cart
        <ShoppingCartIcon fontSize="large" />
      </p>
      <div className="flex flex-col items-center w-full">
        {" "}
        <Container>
          <table className="*:not-first:shadow *:not-first:border-b *:border-gray-400/20">
            <tr className="text-center h-10">
              <th className="w-[60%]">Product</th>
              <th className="w-[20%] md:w-[20%] mr-10">Price</th>
              <th className="w-[20%]">Quantity</th>
            </tr>
            {data?.map((product) => (
              <Suspense fallback={<SkeletonLoad />}>
                <CartItem
                  key={product.id}
                  data={product}
                  handleDelete={handleDelete}
                />
              </Suspense>
            ))}
          </table>
        </Container>
      </div>
    </div>
  );
}

function SkeletonLoad() {
  return (
    <tr className="text-center text-2xl *:h-20">
      <td className="p-5 w-[60%] bg-gray-500/20 animate-pulse">
        <div className="flex w-full gap-2 *:flex-1">
          <div className="rounded empty:h-5 bg-gray-500/50 p-2"></div>
        </div>
      </td>
      <td className="bg-gray-500/20 animate-pulse w-[10%]">
        <div className="rounded empty:h-5 bg-gray-500/50 p-2"></div>
      </td>
      <td className="bg-gray-500/20 animate-pulse align-middle w-[20%]">
        <div className="rounded empty:h-5 bg-gray-500/50 ml-3  p-2"></div>
      </td>
      <td className="bg-gray-500/20 animate-pulse px-5 w-[10%]">
        <div className="rounded empty:h-5 bg-gray-500/50 mr-2 empty:w-[50%] p-2"></div>
      </td>
    </tr>
  );
}
