import { type CartProduct } from "../../utils/data";

import DeleteIcon from "@mui/icons-material/Delete";
export default function CartBody({
  data,
  handleDelete,
}: {
  data: CartProduct;
  handleDelete(id: number): void;
}) {
  return (
    <tr className="bg-[whitesmoke] dark:bg-[#242424] text-center align-middle h-20">
      <td className="font-semibold text-sm md:text-xl text-left p-3">
        {data.title}
      </td>
      <td>${data.price}</td>
      <td>{data.quantity}</td>
      <td>
        <button onClick={() => handleDelete(data.id)}>
          <DeleteIcon className="text-red-500!" />
        </button>
      </td>
    </tr>
  );
}
