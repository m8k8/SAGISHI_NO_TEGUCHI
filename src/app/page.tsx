'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfitInputPage() {
  const router = useRouter();

  // 入力用 state
  const [cash, setCash] = useState('');
  const [credit, setCredit] = useState('');
  const [error, setError] = useState('');

  // 1〜100 億 (100_000_000_000) の範囲で許可
  const MAX = 100_000_000_000;

  // 送信ハンドラ
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const cashNum = Number(cash);
    const creditNum = Number(credit);

    const isValid = (n: number) =>
      Number.isFinite(n) && n > 0 && n <= MAX && Number.isInteger(n);

    if (!isValid(cashNum) || !isValid(creditNum)) {
      setError('1〜100億円までの正の整数を入力してください');
      return;
    }

    // クエリパラメータを付けて /profit へ
    router.push(`/profit?credit=${creditNum}&cash=${cashNum}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow"
      >
        <h1 className="mb-6 text-center text-xl font-bold text-black">
          儲けたい金額を入力
        </h1>

        {/* 現物 */}
        <label className="block text-sm font-medium text-gray-700">
          現物 (円)
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX}
            step={1}
            required
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            placeholder="例: 500000"
          />
        </label>

        {/* 信用 */}
        <label className="mt-4 block text-sm font-medium text-gray-700">
          信用 (円)
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX}
            step={1}
            required
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
            placeholder="例: 250000"
          />
        </label>

        {/* エラーメッセージ */}
        {error && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          実行
        </button>
      </form>
    </main>
  );
}

