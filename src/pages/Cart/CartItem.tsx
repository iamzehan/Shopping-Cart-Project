import { type CartProduct } from "../../utils/data";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { getLocalData } from "../../utils/data";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function CartItem({
  data,
  handleDelete,
}: {
  data: CartProduct;
  handleDelete(id: number): void;
}) {
  const [quantity, setQuantity] = useState(data.quantity);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const dereaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  useEffect(() => {
    const localData = getLocalData();
    const parsedData: CartProduct[] | null = localData
      ? JSON.parse(localData)
      : null;

    if (parsedData) {
      const updatedData = parsedData.map(item =>
        item.id === data.id ? { ...item, quantity } : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }
  }, [quantity, data.id]);

  return (
    <tr className="bg-[whitesmoke] dark:bg-[#242424] text-center align-middle h-20">
      <td className="font-semibold text-sm md:text-xl text-left p-3">
        {data.title}
      </td>
      <td>${data.price}</td>

      <td>
        <div className="flex justify-center">
          <button
            className="bg-red-400 border-red-400 shadow text-white font-bold rounded-l border"
            onClick={dereaseQuantity}
          >
            <RemoveIcon/>
          </button>

          <input
            className="text-center w-[20%] border border-white shadow bg-white dark:border-black dark:bg-black"
            type="text"
            value={quantity}
            readOnly   
          />

          <button
            className="bg-green-400 border border-green-400 shadow text-white font-bold rounded-r"
            onClick={increaseQuantity}
          >
            <AddIcon/>
          </button>
        </div>
      </td>

      <td className="px-5">
        <div className="">
        <button onClick={() => handleDelete(data.id)}>
          <DeleteIcon className="text-red-500!" />
        </button>
        </div>
      </td>
    </tr>
  );
}
