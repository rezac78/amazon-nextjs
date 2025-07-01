import {DownloadableLink, DownloadableSample} from "@/utils/types/types";

interface DownloadableProps {
 product: {
  downloadableLinks?: DownloadableLink[];
  downloadableSamples?: DownloadableSample[];
 };
 selectedDownloadLink: number | null;
 setSelectedDownloadLink: (id: number) => void;
}
export default function Downloadable({product, selectedDownloadLink, setSelectedDownloadLink}: DownloadableProps) {
 const {downloadableLinks = [], downloadableSamples = []} = product;

 if (!Array.isArray(downloadableLinks) || downloadableLinks.length === 0) return null;

 return (
  <>
   <div className="flex flex-row gap-2 mt-4">
    {downloadableLinks.map((link) => (
     <label
      key={link.id}
      className="flex items-center justify-between gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
     >
      <input
       type="radio"
       name="downloadable_link"
       value={link.id}
       checked={selectedDownloadLink === link.id}
       onChange={() => setSelectedDownloadLink(link.id)}
       className="accent-blue-600"
      />
      <span className="flex-1 text-sm">{link.title}</span>
      <span className="whitespace-nowrap font-semibold">{link.formatted_price ?? link.price}</span>
     </label>
    ))}
   </div>
   <div className=" mt-4">نمونه :</div>
   <div className="flex flex-row gap-2">
    {downloadableSamples.length > 0 && (
     <>
      {downloadableSamples.map((sample) => (
       <label
        key={sample.id}
        className="flex items-center justify-between gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
        onClick={() => {
         if (sample.fileUrl) {
          const a = document.createElement("a");
          a.href = sample.fileUrl;
          a.download = sample.fileName || "";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
         } else if (sample.url) {
          window.open(sample.url, "_blank", "noopener,noreferrer");
         }
        }}
       >
        <span className="flex-1 text-sm">{sample.fileName ?? sample.url}</span>
        <span className="whitespace-nowrap font-semibold">{sample.formatted_price ?? sample.price}</span>
       </label>
      ))}
     </>
    )}
   </div>
  </>
 );
}
