import { addToCart, getLength, type Product, type CartProduct } from "../../utils/data";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ReviewsIcon from '@mui/icons-material/Reviews';

export default function Card({ product, setItemsNumber }: { product: Product, setItemsNumber(length:number):void }) {

  function handleAddToCart(){
    const newData:CartProduct = {...product, quantity:0};
    newData["quantity"] = 1;
    addToCart(newData);
    setItemsNumber(getLength());
  }
  return (
    <>
      <div className="rounded shadow-sm border border-gray-300/90 dark:bg-[#0d1117] dark:border-blue-500 flex flex-col justify-between items-center gap-2 md:p-5">
        <p className="p-2 text-wrap font-bold md:text-xl">{product.title}</p>
        <div className="flex gap-2 md:w-full justify-between">
          <p className="text-blue-400 rounded text-sm md:text-base text-center p-2">
            #{product.category}
          </p>
          <p className="dark:text-green-300/40 text-center font-bold text-xl md:text-2xl p-2">
            ${product.price}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="flex items-center text-sm">
            <strong className="hidden md:block">Rating: </strong>
            <Rating
              name="half-rating-read"
              defaultValue={product.rating.rate}
              precision={0.5}
              readOnly
            />({product.rating.rate})
          </p>
          <span className="flex items-center gap-2 text-gray-500 dark:text-gray-300/20 w-full text-sm!"><ReviewsIcon/> {product.rating.count}</span>
        </div>
        <button
         onClick={handleAddToCart}
         className="border w-fit md:w-full px-5 mb-2 md:mb-0 border-blue-500 py-2 rounded bg-blue-500 text-white flex justify-center gap-2 transition-all ease-in-out duration-300 hover:bg-transparent hover:text-blue-500">
          Add to cart <AddShoppingCartIcon className="animate-pulse" />
        </button>
      </div>
    </>
  );
}
