"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowLeftRight,
  BadgeCheck,
  Banknote,
  CalendarClock,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  CreditCard,
  Gauge,
  HeartPulse,
  LucideProps,
  QrCode,
  ReceiptText,
  ScanFace,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Upload,
  Users,
  Wallet,
} from "lucide-react";

type Tier = { name: string; limit: number; color: string };

const tiers: Tier[] = [
  { name: "Tier 1", limit: 50, color: "bg-emerald-500" },
  { name: "Tier 2", limit: 100, color: "bg-cyan-500" },
  { name: "Tier 3", limit: 150, color: "bg-indigo-500" },
  { name: "Tier 4", limit: 200, color: "bg-violet-500" },
];

const installments = [
  { name: "ماه اول", due: "1405/06/05", amount: "4,850,000" },
  { name: "ماه دوم", due: "1405/07/05", amount: "4,850,000" },
  { name: "ماه سوم", due: "1405/08/05", amount: "4,850,000" },
  { name: "ماه چهارم", due: "1405/09/05", amount: "4,850,000" },
];

function toman(value: number) {
  return new Intl.NumberFormat("fa-IR").format(Math.round(value));
}

function percent(value: number) {
  return `${Math.max(0, Math.min(100, value)).toFixed(0)}%`;
}

export default function Page() {
  const [loan, setLoan] = useState(100);
  const [months, setMonths] = useState(6);
  const [phone, setPhone] = useState("09123456789");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [nationalCode, setNationalCode] = useState("0012345678");
  const [shahkarStatus, setShahkarStatus] = useState("در انتظار بررسی");
  const [shahkarOk, setShahkarOk] = useState(false);
  const [videoStage, setVideoStage] = useState(0);
  const [videoOk, setVideoOk] = useState(false);
  const [hasBouncedCheck, setHasBouncedCheck] = useState(false);
  const [hasArrears, setHasArrears] = useState(false);
  const [creditScore, setCreditScore] = useState(0);
  const [tierLimit, setTierLimit] = useState(50);
  const [paidMap, setPaidMap] = useState([false, false, false, false]);
  const [portal, setPortal] = useState<"patient" | "clinic">("patient");
  const [invoiceIssued, setInvoiceIssued] = useState(false);
  const [clinicOtpReady, setClinicOtpReady] = useState(false);
  const [clinicOtp, setClinicOtp] = useState("");
  const [clinicVerified, setClinicVerified] = useState(false);

  const monthly = useMemo(() => loan / months + loan * 0.018, [loan, months]);
  const total = useMemo(() => monthly * months, [monthly, months]);
  const tierProgress = useMemo(() => Math.min(100, ((tierLimit - 50) / 150) * 100), [tierLimit]);
  const topScore = useMemo(() => {
    let score = 760;
    if (hasBouncedCheck) score -= 85;
    if (hasArrears) score -= 70;
    if (mobileVerified) score += 20;
    if (shahkarOk) score += 20;
    if (videoOk) score += 20;
    return Math.max(320, Math.min(820, score));
  }, [hasBouncedCheck, hasArrears, mobileVerified, shahkarOk, videoOk]);

  const verifyOtp = () => {
    if (otp === "2468") setMobileVerified(true);
  };

  const verifyShahkar = () => {
    const ok = nationalCode.length === 10 && nationalCode.startsWith("001");
    setShahkarOk(ok);
    setShahkarStatus(ok ? "تطابق با شماره موبایل تایید شد" : "عدم تطابق در سرویس شاهکار");
  };

  const runVideo = () => {
    setVideoStage(1);
    setTimeout(() => setVideoStage(2), 900);
    setTimeout(() => {
      setVideoStage(3);
      setVideoOk(true);
    }, 1800);
  };

  const scoreNow = () => {
    let score = topScore;
    if (hasBouncedCheck) score -= 70;
    if (hasArrears) score -= 50;
    score = Math.max(300, Math.min(850, score));
    setCreditScore(score);
    setTierLimit(score >= 740 && !hasBouncedCheck && !hasArrears ? 200 : score >= 680 ? 100 : 50);
  };

  const createInvoice = () => {
    setInvoiceIssued(true);
    setClinicOtpReady(true);
  };

  const verifyClinicOtp = () => {
    if (clinicOtp === "8352") setClinicVerified(true);
  };

  return (
    <main className="min-h-screen pb-16 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="panel overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="chip"><HeartPulse className="h-4 w-4" /> اعتبار سلامت</span>
                <span className="chip"><ShieldCheck className="h-4 w-4" /> BNPL درمانی</span>
                <span className="chip"><Users className="h-4 w-4" /> بیمار، کلینیک، پذیرش</span>
              </div>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                اعتبار درمانی لحظه‌ای برای مسیر مراجعه، تایید و پرداخت اقساطی.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                این دمو، از ثبت موبایل تا اعتبارسنجی شاهکار، KYC و صدور فاکتور درمانی را در یک تجربه
                واحد شبیه‌سازی می‌کند.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["اعتبار پایه", "50 میلیون تومان"],
                  ["سقف رشد", "تا 200 میلیون تومان"],
                  ["زمان پاسخ", "زیر 3 دقیقه"],
                ].map(([k, v]) => (
                  <div key={k} className="panel-strong p-4">
                    <div className="text-xs text-slate-500">{k}</div>
                    <div className="mt-2 text-lg font-bold text-slate-900">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-200/70 bg-slate-950 p-6 text-white lg:border-r lg:border-t-0 sm:p-8">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>شبیه‌ساز قسط</span>
                <Gauge className="h-4 w-4" />
              </div>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                <label className="mb-3 block text-xs text-slate-300">مبلغ خرید</label>
                <input
                  type="range"
                  min={50}
                  max={200}
                  step={10}
                  value={loan}
                  onChange={(e) => setLoan(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>50M</span><span>200M</span>
                </div>
                <div className="mt-4 text-3xl font-black">{toman(loan)} تومان</div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[4, 6, 9, 12].map((m) => (
                    <button key={m} className={`rounded-2xl border px-3 py-3 text-sm font-semibold ${months === m ? 'border-emerald-400 bg-emerald-400/15 text-emerald-200' : 'border-white/10 bg-white/5 text-slate-300'}`} onClick={() => setMonths(m)}>
                      {m} ماه
                    </button>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-black/20 p-4">
                    <div className="text-xs text-slate-400">قسط ماهانه</div>
                    <div className="mt-2 text-2xl font-bold">{toman(monthly)} تومان</div>
                  </div>
                  <div className="rounded-2xl bg-black/20 p-4">
                    <div className="text-xs text-slate-400">بازپرداخت کل</div>
                    <div className="mt-2 text-2xl font-bold">{toman(total)} تومان</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-5 sm:p-6">
            <div className="section-title mb-1">مرحله 1: موبایل و OTP</div>
            <div className="section-subtitle mb-4">شبیه‌سازی ارسال کد و تایید کاربر</div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input className="field" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0912xxxxxxx" />
              <button className="btn-primary" onClick={() => setOtpSent(true)}><Smartphone className="h-4 w-4" /> ارسال OTP</button>
            </div>
            {otpSent && (
              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input className="field" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="کد 2468" />
                <button className="btn-secondary" onClick={verifyOtp}><BadgeCheck className="h-4 w-4" /> تایید</button>
              </div>
            )}
            <div className="mt-3 text-sm text-slate-600">وضعیت: <span className="font-semibold text-slate-900">{mobileVerified ? 'تایید شد' : otpSent ? 'در انتظار ورود کد' : 'ارسال نشده'}</span></div>
          </div>

          <div className="panel p-5 sm:p-6">
            <div className="section-title mb-1">مرحله 2: کد ملی و شاهکار</div>
            <div className="section-subtitle mb-4">اعتبارسنجی تطابق هویتی در لحظه</div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input className="field" value={nationalCode} onChange={(e) => setNationalCode(e.target.value)} placeholder="کد ملی 10 رقمی" />
              <button className="btn-primary" onClick={verifyShahkar}><ArrowLeftRight className="h-4 w-4" /> استعلام</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className={`chip ${shahkarOk ? 'border-emerald-300 text-emerald-700' : 'border-amber-300 text-amber-700'}`}>{shahkarStatus}</span>
              <span className="chip">موبایل: {phone}</span>
            </div>
          </div>

          <div className="panel p-5 sm:p-6">
            <div className="section-title mb-1">مرحله 3: Video KYC / Liveness</div>
            <div className="section-subtitle mb-4">اتصال زنده، حرکت سر و تشخیص حضور</div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn-primary" onClick={runVideo}><Camera className="h-4 w-4" /> شروع ضبط</button>
              <span className="chip">وضعیت: {videoStage === 0 ? 'آماده' : videoStage === 1 ? 'چهره در قاب' : videoStage === 2 ? 'تشخیص زنده بودن' : 'تایید شد'}</span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-gradient-to-l from-brand-500 to-accent-500 transition-all" style={{ width: `${(videoStage / 3) * 100}%` }} />
            </div>
          </div>

          <div className="panel p-5 sm:p-6">
            <div className="section-title mb-1">مرحله 4: موتور امتیاز اعتباری</div>
            <div className="section-subtitle mb-4">چک برگشتی، معوقه و سطح ریسک را شبیه‌سازی کنید</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"><input type="checkbox" checked={hasBouncedCheck} onChange={(e) => setHasBouncedCheck(e.target.checked)} /> چک برگشتی</label>
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"><input type="checkbox" checked={hasArrears} onChange={(e) => setHasArrears(e.target.checked)} /> معوقه پرداخت</label>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button className="btn-primary" onClick={scoreNow}><CreditCard className="h-4 w-4" /> محاسبه امتیاز</button>
              <span className="chip"><ClipboardList className="h-4 w-4" /> امتیاز: {creditScore || topScore}</span>
              <span className="chip"><Wallet className="h-4 w-4" /> سقف: {toman(tierLimit * 1000000)} تومان</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel p-5 sm:p-6">
            <div className="section-title mb-1">مرحله 5: داشبورد بیمار</div>
            <div className="section-subtitle mb-5">سقف اعتبار، فاکتورهای فعال، تقویم اقساط و QR کلینیک</div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between text-sm text-slate-300"><span>سقف اعتبار جاری</span><Banknote className="h-4 w-4" /></div>
                <div className="mt-4 text-4xl font-black">{toman(tierLimit * 1000000)}</div>
                <div className="mt-2 text-sm text-slate-400">پایه 50 میلیون و رشد تا 200 میلیون</div>
                <div className="mt-5 h-3 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: percent(tierProgress) }} />
                </div>
                <div className="mt-2 text-xs text-slate-400">پیشرفت ارتقا به سقف 200M</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-800"><span>کارت وضعیت</span><Activity className="h-4 w-4" /></div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>موبایل</span><span className="font-semibold">{mobileVerified ? 'تایید' : 'ناقص'}</span></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>شاهکار</span><span className="font-semibold">{shahkarOk ? 'تایید' : 'ناقص'}</span></div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>KYC</span><span className="font-semibold">{videoOk ? 'تایید' : 'در انتظار'}</span></div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><ReceiptText className="h-4 w-4" /> فاکتورهای فعال</div>
                <div className="space-y-2 text-sm text-slate-600">
                  {['ویزیت متخصص', 'آزمایش CBC', 'تصویربرداری'].map((item, idx) => (
                    <div key={item} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>{item}</span><span>{toman((idx + 1) * 2850000)} تومان</span></div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><CalendarClock className="h-4 w-4" /> تقویم اقساط</div>
                <div className="space-y-2 text-sm text-slate-600">
                  {installments.map((row, idx) => (
                    <button key={row.name} className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-right" onClick={() => setPaidMap((prev) => prev.map((p, i) => i === idx ? !p : p))}>
                      <span>{row.name} · {row.due}</span>
                      <span className="flex items-center gap-2 font-semibold">{paidMap[idx] ? 'پرداخت شد' : row.amount}<CheckCircle2 className={`h-4 w-4 ${paidMap[idx] ? 'text-emerald-600' : 'text-slate-300'}`} /></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="panel p-5 sm:p-6">
            <div className="section-title mb-1">پرتال پذیرش و پزشک</div>
            <div className="section-subtitle mb-4">صدور فاکتور، ارسال OTP و ورود به پرونده بیمار</div>
            <div className="flex gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <button className={`btn ${portal === 'patient' ? 'bg-white shadow-sm' : 'text-slate-500'}`} onClick={() => setPortal('patient')}><Users className="h-4 w-4" /> بیمار</button>
              <button className={`btn ${portal === 'clinic' ? 'bg-white shadow-sm' : 'text-slate-500'}`} onClick={() => setPortal('clinic')}><Stethoscope className="h-4 w-4" /> کلینیک</button>
            </div>
            {portal === 'clinic' ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold">صدور فاکتور به بیمار</div>
                  <p className="mt-1 text-sm text-slate-600">پذیرش می‌تواند یک صورتحساب درمانی جدید ثبت کند.</p>
                  <button className="btn-primary mt-4" onClick={createInvoice}><ReceiptText className="h-4 w-4" /> صدور فاکتور</button>
                  <div className="mt-3 text-sm text-slate-600">وضعیت: <span className="font-semibold text-slate-900">{invoiceIssued ? 'صادر شد' : 'در انتظار'}</span></div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold">OTP پذیرش</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
                    <input className="field" value={clinicOtp} onChange={(e) => setClinicOtp(e.target.value)} placeholder="8352" disabled={!clinicOtpReady} />
                    <button className="btn-secondary" onClick={verifyClinicOtp} disabled={!clinicOtpReady}><ShieldCheck className="h-4 w-4" /> تایید</button>
                  </div>
                  <div className="mt-3 text-sm text-slate-600">وضعیت: <span className="font-semibold text-slate-900">{clinicVerified ? 'پذیرش تایید شد' : clinicOtpReady ? 'کد ارسال شد' : 'نیاز به صدور فاکتور'}</span></div>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-sm font-semibold"><span>QR مراجعه</span><QrCode className="h-4 w-4" /></div>
                <div className="mt-4 grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8">
                  <div className="grid grid-cols-8 gap-1 rounded-2xl bg-white p-3 shadow-sm">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={`h-3 w-3 ${i % 3 === 0 || i % 5 === 0 ? 'bg-slate-900' : 'bg-white'}`} />
                    ))}
                  </div>
                  <div className="mt-4 text-center text-sm text-slate-600">اسکن برای باز کردن پرونده و تطبیق فاکتور</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="panel p-5 sm:p-6">
          <div className="grid gap-3 md:grid-cols-4">
            {tiers.map((tier, idx) => (
              <div key={tier.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-800"><span>{tier.name}</span><span className={`h-2 w-2 rounded-full ${tier.color}`}></span></div>
                <div className="mt-3 text-2xl font-black">{tier.limit}M</div>
                <div className="mt-1 text-xs text-slate-500">سقف اعتبار {idx === 0 ? 'ورودی' : 'ارتقا یافته'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
