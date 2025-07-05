// Next.js 15+ (App Router) – mobile‑sized realised‑profit screen with a simulated phone status bar styled like an Android toolbar
// URL example: /profit?cash=93890&credit=396927

export default async function ProfitPage({
  searchParams,
}: {
  searchParams: Promise<{ cash?: string; credit?: string }>;
}) {
  const { cash = '0', credit = '0' } = await searchParams;
  const cashNum = Number(cash);
  const creditNum = Number(credit);
  const total = cashNum + creditNum;

  // ------- Simulated device state -------
  const timeString = new Date().toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const batteryPct = 68; // static demo value – hook up to a prop or state if you need realtime
  // --------------------------------------

  const formatYen = (value: number) => {
    const sign = value >= 0 ? '+' : '-';
    return `${sign}${Math.abs(value).toLocaleString('ja-JP')}円`;
  };

  // 今日（JST）の文字列を作成
  const today = new Date(
    Date.now() + 9 * 60 * 60 * 1000 // サーバが UTC でも JST に補正
  )
    .toISOString()
    .slice(0, 10);

  return (
    <div className="bg-gray-100">
        <p className="text-center text-black font-bold bg-gray-100 pt-10">
            こちらの写真をSNSにアップロードしたらあなたも億万長者！
        </p>
        <p className="text-center text-black font-bold mb-4 bg-gray-100 pt-2">
            ...というのは冗談ですが、SNSでシェアされている画像もこのように簡単に偽造できるので注意しましょうという。
        </p>
    <div className="min-h-screen flex items-start justify-center bg-gray-100 py-8">
      {/* Simulated phone viewport so it looks identical on PC and mobile */}
      <div className="w-[375px] bg-white shadow rounded-lg overflow-hidden font-sans">
        {/* ▽▽▽  Simulated Android status bar ▽▽▽ */}
        <div className="px-3 py-[6px] flex items-center justify-between text-[12px] text-gray-800 bg-white border-b border-gray-200">
          {/* Time (left‑aligned) */}
          <span className="font-medium tracking-wide w-10">{timeString}</span>

          {/* Right‑aligned indicators */}
          <div className="flex items-center space-x-1">
            {/* Notification badge – LINE icon substitute */}
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              aria-label="LINE"
              className="text-gray-700"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                d="M15.5 8.8c0-.8-.8-1.4-1.7-1.4H10.2c-.9 0-1.7.6-1.7 1.4v3c0 .8.8 1.4 1.7 1.4h.4L12 15l1.4-1.8h.4c.9 0 1.7-.6 1.7-1.4v-3z"
                fill="#fff"
              />
            </svg>

            {/* Middle dot */}
            <span className="text-xl leading-none">•</span>

            {/* Signal icon */}
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              aria-label="signal"
              className="text-gray-700"
            >
              <path d="M2 18h2v3H2zM6 14h2v7H6zM10 10h2v11h-2zM14 6h2v15h-2zM18 2h2v19h-2z" />
            </svg>

            <span className="mr-1">4G+</span>

            {/* Battery icon */}
            <svg
              viewBox="0 0 28 14"
              width="26"
              height="14"
              aria-label="battery"
              className="text-gray-700"
            >
              <rect
                x="1"
                y="1"
                width="22"
                height="12"
                rx="2"
                ry="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              {/* battery tip */}
              <rect x="24" y="4" width="3" height="6" rx="1" fill="currentColor" />
              {/* battery level */}
              <rect
                x="3"
                y="3"
                width={(batteryPct / 100) * 18}
                height="8"
                rx="1"
                fill="currentColor"
              />
            </svg>
            <span>{batteryPct}%</span>
          </div>
        </div>
        {/* △△△  End status bar △△△ */}

        {/* Header */}
        <header className="mx-4 py-3 border-t border-blue-500 mt-4">
          <h1 className="font-semibold text-black p-0">実現損益</h1>
        </header>

        {/* ▽▽▽ 期間セレクター ▽▽▽ */}
        <section className="mx-4 my-4 rounded-md bg-[#F5F8FC] px-4 pt-4 pb-6 shadow-inner text-sm">
          {/* 見出し */}
          <h2 className="font-semibold mb-3 text-black">期間</h2>

          {/* ラジオボタン */}
          <div className="flex items-center space-x-8 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="dateType"
                defaultChecked
                className="h-4 w-4 accent-blue-600"
              />
              <span className="text-gray-900">約定日</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="dateType" className="h-4 w-4 accent-blue-600" />
              <span className="text-gray-900">受渡日</span>
            </label>
          </div>

          {/* 日付入力 */}
          <div>
            <input
              type="date"
              className="w-full h-6 rounded border border-[#CDD5DF] bg-white px-1 py-0 text-black focus:outline-none focus:ring-2 focus:ring-[#0060C4] text-xs"
              defaultValue={today}
            />
            <span className="block ml-1">から</span>
            <input
              type="date"
              className="w-full h-6 rounded border border-[#CDD5DF] bg-white px-1 py-0 text-black focus:outline-none focus:ring-2 focus:ring-[#0060C4] text-xs"
              defaultValue={today}
            />
          </div>

          {/* クイック選択ボタン（昨日は入れずに4つだけ） */}
          <div className="mt-4 flex items-center gap-2">
            {[
              { label: '今日', primary: true },
              { label: '今週' },
              { label: '今月' },
              { label: '今年' },
            ].map(({ label, primary }) => (
              <button
                key={label}
                className={[
                  'px-4 py-1 rounded text-xs font-medium',
                  primary
                    ? 'bg-[#0060C4] text-white'
                    : 'bg-white border border-[#0060C4] text-[#0060C4]',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 照会ボタン */}
          <button className="mt-6 mx-auto block w-[150px] rounded-md bg-[#4B6FC1] py-1 text-white font-semibold shadow shadow-blue-200/60">
            照会
          </button>
        </section>
        {/* △△△ 期間セレクターここまで △△△ */}

        {/* ▽▽▽ Results ▽▽▽ */}
        <section className="text-sm">
          {/* 現物 */}
          <div className="grid grid-cols-[1fr_auto] mx-4 py-3 border-t border-gray-400">
            {/* 左カラム  */}
            <div>
              <p className="flex items-center space-x-1 text-[#0046A6] font-medium">
                <span>国内株式(現物)</span>
                <span>&gt;</span>
              </p>
              <p className="text-gray-500 mt-1">実現損益(税引前)</p>
            </div>
            {/* 右カラム  */}
            <div className="flex flex-col items-end">
              <span className="text-[#0060C4] leading-none font-bold">＋</span>
              <p className={`mt-1 ${total >= 0 ? 'text-rose-600' : 'text-blue-600'}`}>{formatYen(cashNum)}</p>
            </div>
          </div>

          {/* 信用 */}
          <div className="grid grid-cols-[1fr_auto] mx-4 py-3 border-t border-gray-400">
            <div>
              <p className="flex items-center space-x-1 text-[#0046A6] font-medium">
                <span>国内株式(信用)</span>
                <span>&gt;</span>
              </p>
              <p className="text-gray-500 mt-1">実現損益(税引前)</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[#0060C4] leading-none font-bold">＋</span>
              <p className={`mt-1 ${total >= 0 ? 'text-rose-600' : 'text-blue-600'}`}>{formatYen(creditNum)}</p>
            </div>
          </div>

          {/* 合計 */}
          <div className="grid grid-cols-[1fr_auto] mx-4 py-3 border-t border-gray-400">
            <div>
              <p className="flex items-center space-x-1 text-black font-medium">
                <span>合計</span>
              </p>
              <p className="text-gray-500 mt-1 font-normal">実現損益(税引前)</p>
            </div>
            <div className="flex flex-col items-end font-normal">
              <span className="text-[#0060C4] leading-none font-bold">＋</span>
              <p className={`mt-1 ${total >= 0 ? 'text-rose-600' : 'text-blue-600'}`}>{formatYen(total)}</p>
            </div>
          </div>
        </section>
        {/* △△△  Results end △△△ */}

        {/* Footer links / actions */}
       <section className="p-4 space-y-4 flex flex-col items-end">
          {/* 右端寄せリンク */}
          <a
            href="#"
            className="text-[#0046A6] text-xs font-medium flex items-center"
          >
            配当金・分配金履歴はこちら &gt;
          </a>

        </section>
        <section className="p-4 space-y-4 flex flex-col items-center">
            {/* コンパクトなボタン */}
            <button className="border rounded py-1 px-4 text-[#0046A6] border-[#0046A6]">
              詳細条件で検索 &gt;
            </button>
        </section>
      </div>
    </div>
    </div>
  );
}

