// import { buttonVariants } from "./ui/button";

// export default function StatusBadge({ status = "draft" }) {
//   const style = {
//     draft: {
//       dot: "bg-[rgba(55,59,83,1)]",
//       text: "text-[rgb(55,59,83)]",
//       bg: "rgba(55,59,83,0.05)",
//     },
//     paid: {
//       dot: "bg-[#33D69F]",
//       text: "text-[#33D69F]",
//       bg: "rgba(51,214,159,0.05)",
//     },
//     pending: {
//       dot: "bg-[#FF8F00]",
//       text: "text-[#FF8F00]",
//       bg: "rgba(255,143,0,0.05)",
//     },
//   };

//   return (
//     <span
//       className={`${buttonVariants({ variant: "outline" })} flex items-center justify-center gap-2 min-w-[104px] py-1 px-2 rounded-md`}
//       style={{ backgroundColor: style[status].bg }}
//     >
//       <span className={`inline-block w-2 h-2 rounded-full ${style[status].dot}`}></span>
//       <span className={`capitalize ${style[status].text}`}>{status}</span>
//     </span>
//   );
// }




import { buttonVariants } from "./ui/button";

export default function StatusBadge({ status = "draft" }) {
  const style = {
    draft: {
      dot: "bg-[rgba(55,59,83,1)]",
      text: "text-[rgb(55,59,83)]",
      bg: "rgba(55,59,83,0.05)",
    },
    paid: {
      dot: "bg-[#33D69F]",
      text: "text-[#33D69F]",
      bg: "rgba(51,214,159,0.05)",
    },
    pending: {
      dot: "bg-[#FF8F00]",
      text: "text-[#FF8F00]",
      bg: "rgba(255,143,0,0.05)",
    },
  };

  const currentStyle = style[status] || style["draft"];

  return (
    <span
      className={`${buttonVariants({ variant: "outline" })} flex items-center justify-center gap-2 min-w-[104px] py-1 px-2 rounded-md`}
      style={{ backgroundColor: currentStyle.bg }}
    >
      <span className={`inline-block w-2 h-2 rounded-full ${currentStyle.dot}`}></span>
      <span className={`capitalize ${currentStyle.text}`}>{status}</span>
    </span>
  );
}
