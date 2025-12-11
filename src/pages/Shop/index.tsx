import usePageTitle from "../../utils/page-title";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect, lazy, Suspense } from "react";
import { getData, getLength, type Product } from "../../utils/data";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useOutletContext } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

type OutletCtx = {
  setItemsNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Card = lazy(() => import("../../components/Card"));
export default function Shop() {
  usePageTitle("Shop");
  const { setItemsNumber } = useOutletContext<OutletCtx>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[] | null>(null);
  useEffect(() => {
    const loadData = async () => {
      const jsonData = await getData(1, 10);
      setData(jsonData);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    setItemsNumber(getLength());
  });
  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <p className="flex gap-2 text-3xl items-center justify-center mt-10">
        Shop <LocalMallIcon fontSize="large" />
      </p>
      <div
        className="mt-10 grid gap-2 px-5 grid-cols-2
            md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
      >
        {data &&
          data.map((product) => {
            return (
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-[300px] border border-gray-500 rounded animate-pulse">
                    <CircularProgress size="35px" color="inherit"/>
                  </div>
                }
              >
                <Card
                  key={product.id}
                  product={product}
                  setItemsNumber={setItemsNumber}
                />
              </Suspense>
            );
          })}
      </div>
    </div>
  );
}
