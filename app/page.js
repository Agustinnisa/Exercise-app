// "use client";
// import { useState } from "react";
// export default function CounterPage() {
//   const [count, setCount] = useState(0);
//   return (
//     <main>
//       <h1>Counter</h1>
//       <p>Jumlah: {count}</p>
//       <div className="flex gap-4">
//         <button onClick={() => setCount(count + 1)}> [Tambah] </button>
//       </div>

//     </main>
//   );
// }

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
        <Navbar />
        <h1>Home</h1>
    </>
  )
}