import AllProducts from "@/components/AllProducts";
import PriceDrops from "@/components/PriceDrops";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <PriceDrops></PriceDrops>
    <AllProducts></AllProducts>
   </div>
  );
}
