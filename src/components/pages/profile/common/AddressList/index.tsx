import {Button} from "@/components/ui/button";
import PencilIcon from "@/public/icons/Pencil";
import TrashIcon from "@/public/icons/Trash";
import {Address} from "@/utils/types";

export default function AddressList({
 addresses,
 onEdit,
 onDelete,
}: {
 addresses: Address[];
 onEdit: (item: Address) => void;
 onDelete: (id: number) => void;
}) {
 return (
  <div className="space-y-4 h-[630px] overflow-auto">
   {addresses.length === 0 ? (
    <div className="text-center ">هیچ آیتمی در لیست وجود ندارد</div>
   ) : (
    addresses.map((item) => (
     <div
      key={item.id}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-xl p-4 bg-white shadow-sm"
     >
      <div className="text-sm text-gray-700 leading-6 space-y-1 w-full sm:w-3/4">
       <p className="font-bold text-base">
        {item.first_name} {item.last_name} - {item.company_name}
       </p>
       <p>{Array.isArray(item.address) ? item.address.join(" , ") : item.address}</p>
       <p>
        {item.city}, {item.state}, {item.country_name}, {item.postcode}
       </p>
       <p>{item.phone}</p>
       <p>{item.email}</p>
       <p>{item.vat_id}</p>
      </div>

      <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
       <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
        <PencilIcon className="w-4 h-4 ml-1" />
       </Button>
       <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
        <TrashIcon className="w-4 h-4 ml-1" />
       </Button>
      </div>
     </div>
    ))
   )}
  </div>
 );
}
