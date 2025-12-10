import usePageTitle from "../../utils/page-title";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect, lazy, Suspense } from "react";
import { getData, type Product } from "../../utils/data";
import LocalMallIcon from '@mui/icons-material/LocalMall';

const Card = lazy(() => import("../../components/Card"));
export default function Shop() {
  usePageTitle("Shop");
  const [data, setData] = useState<Product[] | null>(null);
  useEffect(() => {
    const loadData = async () => {
      const jsonData = await getData(1, 10);
      setData(jsonData);
    };
    loadData();
  }, []);
  return (
    <div className="flex flex-col gap-5 w-screen">
      <p className="flex gap-2 text-3xl items-center justify-center">Shop <LocalMallIcon fontSize="large" /></p>
      <div className="mt-10 grid gap-2 px-5 grid-cols-2
            md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">

        {data &&
          data.map((product) => {
            return (
              <Suspense fallback={<div className="flex justify-center items-center h-[300px] border border-orange-500 rounded animate-pulse"><CircularProgress size="15px"/></div>}>
                <Card key={product.id} product={product} />
              </Suspense>
            );
          })}
      </div>
    </div>
  );
}
