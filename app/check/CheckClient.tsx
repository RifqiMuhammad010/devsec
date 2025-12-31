'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contractConfig';
import {
  Search,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Ruler,
  Activity,
  User,
  Tag
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function CheckClient() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [searchId, setSearchId] = useState(initialId);
  const [koiData, setKoiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper format timestamp blockchain → tanggal
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '-';
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fungsi cek ke blockchain
  const handleCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!searchId.trim()) {
      setError("Masukkan ID Koi!");
      return;
    }

    setLoading(true);
    setError('');
    setKoiData(null);

    try {
      const provider = new ethers.JsonRpcProvider(
        "http://127.0.0.1:8545/"
      );

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const data = await contract.getKoi(searchId);

      if (!data || !data.id) {
        setError("Data Koi tidak ditemukan di Blockchain!");
      } else {
        setKoiData(data);
      }

    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke Blockchain. Pastikan node Hardhat aktif.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-check jika URL punya ?id=
  useEffect(() => {
    if (initialId) handleCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  return (
    <>
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Verifikasi Keaslian
        </h1>
        <p className="text-gray-500 mb-8">
          Cek data sertifikat digital Ikan Koi di Blockchain.
        </p>

        <form onSubmit={handleCheck} className="max-w-lg mx-auto relative">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Masukkan ID Koi (Contoh: KOI-2025-888)"
            className="w-full pl-6 pr-14 py-4 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none text-lg shadow-sm transition"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bg-orange-600 text-white p-2.5 rounded-full hover:bg-orange-700 transition shadow-md"
          >
            <Search size={24} />
          </button>
        </form>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">
            Sedang mencari di Blockchain...
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl text-center max-w-lg mx-auto">
          <p className="font-bold mb-1">Pencarian Gagal</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* RESULT */}
      {koiData && (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

          <div className="bg-gray-900 text-white p-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/50 text-green-300 px-4 py-1 rounded-full text-sm font-bold mb-4">
              <ShieldCheck size={16} /> TERVERIFIKASI BLOCKCHAIN
            </div>
            <h2 className="text-4xl font-extrabold mb-1">
              {koiData.variety}
            </h2>
            <p className="text-gray-400 font-mono">
              {koiData.id}
            </p>
          </div>

          <div className="p-8 space-y-4">
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-gray-500">
                <User size={18} /> Breeder
              </span>
              <span className="font-bold">{koiData.breeder}</span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-gray-500">
                <Activity size={18} /> Gender
              </span>
              <span className="font-bold">{koiData.gender}</span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-gray-500">
                <Calendar size={18} /> Umur
              </span>
              <span className="font-bold">{koiData.age}</span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-gray-500">
                <Ruler size={18} /> Ukuran
              </span>
              <span className="font-bold">
                {Number(koiData.size)} cm
              </span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-gray-500">
                <CheckCircle size={18} /> Kondisi
              </span>
              <span className="font-bold">{koiData.condition}</span>
            </div>

            <div className="pt-4 text-xs text-gray-400 border-t">
              <div className="flex justify-between">
                <span>Dicatat:</span>
                <span>{formatDate(koiData.timestamp)}</span>
              </div>
              <div className="flex justify-between">
                <span>Issuer:</span>
                <span className="font-mono truncate max-w-[150px]">
                  {koiData.issuer}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {koiData.certUrl && (
                <a
                  href={koiData.certUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-orange-50 text-orange-700 py-2 rounded-lg text-sm font-bold hover:bg-orange-100 transition"
                >
                  <Tag size={16} /> Sertifikat Asli
                </a>
              )}
              {koiData.contestUrl && (
                <a
                  href={koiData.contestUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition"
                >
                  <Tag size={16} /> Sertifikat Lomba
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
