import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import CheckClient from "./CheckClient";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Suspense
          fallback={
            <div className="text-center py-12 text-gray-500">
              Loading halaman verifikasi...
            </div>
          }
        >
          <CheckClient />
        </Suspense>
      </main>
    </div>
  );
}
