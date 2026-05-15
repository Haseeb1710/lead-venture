"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  Check,
} from "lucide-react"
import { submitContact } from "@/lib/actions"

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
]

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

type Step = "date" | "time" | "details" | "confirmed"

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isWeekend(d: Date) {
  const day = d.getDay()
  return day === 0 || day === 6
}

export default function AppointmentBooker() {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [viewMonth, setViewMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<Step>("date")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Build the calendar grid: leading blanks + days of month
  const calendarCells = useMemo(() => {
    const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1)
    const lastDay = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0
    )
    const startOffset = firstDay.getDay()
    const cells: Array<Date | null> = []
    for (let i = 0; i < startOffset; i++) cells.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) {
      cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d))
    }
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [viewMonth])

  function isDayAvailable(d: Date) {
    if (d.getTime() < today.getTime()) return false
    if (isWeekend(d)) return false
    // Cap availability at 60 days out
    const max = new Date(today)
    max.setDate(max.getDate() + 60)
    if (d.getTime() > max.getTime()) return false
    return true
  }

  function goMonth(delta: number) {
    const next = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + delta,
      1
    )
    setViewMonth(next)
  }

  function selectDate(d: Date) {
    setSelectedDate(d)
    setSelectedTime(null)
    setStep("time")
  }

  function selectTime(t: string) {
    setSelectedTime(t)
    setStep("details")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setSubmitting(true)
    setError("")
    const formData = new FormData(e.currentTarget)
    formData.append(
      "appointment",
      `${selectedDate.toDateString()} at ${selectedTime}`
    )
    const result = await submitContact(formData)
    setSubmitting(false)
    if (result.success) setStep("confirmed")
    else setError(result.error ?? "Something went wrong. Please try again.")
  }

  const summaryLine =
    selectedDate && selectedTime
      ? `${selectedDate.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })} · ${selectedTime}`
      : null

  return (
    <div
      className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]"
      style={{
        background:
          "linear-gradient(135deg, rgba(100,206,251,0.08) 0%, rgba(167,139,250,0.06) 50%, rgba(124,58,237,0.08) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 48px rgba(0,0,0,0.45)",
        backdropFilter: "blur(20px) saturate(100%)",
        WebkitBackdropFilter: "blur(20px) saturate(100%)",
      }}
    >
      {/* Left column — meeting summary */}
      <aside
        className="p-7 lg:p-9 border-b lg:border-b-0 lg:border-r"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#64CEFB]"
          style={{
            background: "rgba(100,206,251,0.10)",
            border: "1px solid rgba(100,206,251,0.25)",
          }}
        >
          Lead Venture
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-white mt-4 leading-tight">
          Book your 48-hour build call.
        </h3>
        <p className="text-white/65 mt-3 leading-relaxed text-sm md:text-base">
          A 30-minute strategy session. We'll review your goals, walk you
          through the 48-hour build process, and confirm your launch slot.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-white/75">
          <li className="flex items-center gap-2.5">
            <Clock size={16} color="#64CEFB" strokeWidth={2.2} />
            30 minutes
          </li>
          <li className="flex items-center gap-2.5">
            <CalendarIcon size={16} color="#A78BFA" strokeWidth={2.2} />
            Mon–Fri, 9 AM – 5 PM (your local time)
          </li>
        </ul>

        {summaryLine && step !== "confirmed" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-xl p-4"
            style={{
              background: "rgba(100,206,251,0.08)",
              border: "1px solid rgba(100,206,251,0.22)",
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#64CEFB] mb-1.5">
              Selected
            </div>
            <div className="text-white font-semibold text-sm">{summaryLine}</div>
          </motion.div>
        )}
      </aside>

      {/* Right column — calendar / slots / form */}
      <div className="p-7 lg:p-9 min-h-[480px]">
        <AnimatePresence mode="wait">
          {step === "date" && (
            <motion.div
              key="date"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Month header */}
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-white font-semibold">
                  {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                </h4>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Previous month"
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                    onClick={() => goMonth(-1)}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next month"
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                    onClick={() => goMonth(1)}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Weekday header */}
              <div className="grid grid-cols-7 gap-1 mb-2 text-[11px] uppercase tracking-widest text-white/40 text-center font-semibold">
                {DAY_LABELS.map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {calendarCells.map((d, i) => {
                  if (!d)
                    return <div key={`b-${i}`} className="aspect-square" />
                  const available = isDayAvailable(d)
                  const isToday = isSameDay(d, today)
                  const isSelected = selectedDate
                    ? isSameDay(d, selectedDate)
                    : false
                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      disabled={!available}
                      onClick={() => selectDate(d)}
                      className="aspect-square rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                      style={{
                        color: !available
                          ? "rgba(255,255,255,0.18)"
                          : isSelected
                            ? "#ffffff"
                            : "rgba(255,255,255,0.85)",
                        background: isSelected
                          ? "linear-gradient(135deg, #64CEFB, #A78BFA)"
                          : available
                            ? "rgba(255,255,255,0.04)"
                            : "transparent",
                        border: isToday && !isSelected
                          ? "1px solid rgba(100,206,251,0.50)"
                          : "1px solid transparent",
                        boxShadow: isSelected
                          ? "0 4px 14px rgba(100,206,251,0.30)"
                          : undefined,
                      }}
                      aria-label={d.toDateString()}
                    >
                      {d.getDate()}
                    </button>
                  )
                })}
              </div>

              <p className="text-[11px] text-white/40 mt-5">
                Weekdays only · Available within the next 60 days
              </p>
            </motion.div>
          )}

          {step === "time" && selectedDate && (
            <motion.div
              key="time"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-white font-semibold">
                  Pick a time
                </h4>
                <button
                  type="button"
                  className="text-xs text-white/55 hover:text-white transition-colors"
                  onClick={() => setStep("date")}
                >
                  ← Change date
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TIME_SLOTS.map((t) => {
                  const isSelected = selectedTime === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => selectTime(t)}
                      className="rounded-xl py-3 text-sm font-semibold transition-colors"
                      style={{
                        color: isSelected ? "#ffffff" : "rgba(255,255,255,0.85)",
                        background: isSelected
                          ? "linear-gradient(135deg, #64CEFB, #A78BFA)"
                          : "rgba(255,255,255,0.04)",
                        border: isSelected
                          ? "1px solid rgba(100,206,251,0.50)"
                          : "1px solid rgba(255,255,255,0.10)",
                        boxShadow: isSelected
                          ? "0 4px 14px rgba(100,206,251,0.25)"
                          : undefined,
                      }}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === "details" && selectedDate && selectedTime && (
            <motion.form
              key="details"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-white font-semibold">Your details</h4>
                <button
                  type="button"
                  className="text-xs text-white/55 hover:text-white transition-colors"
                  onClick={() => setStep("time")}
                >
                  ← Change time
                </button>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">
                    Full Name <span style={{ color: "#64CEFB" }}>*</span>
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="Jane Smith"
                    className="lv-input w-full rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/40"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5">
                      Email <span style={{ color: "#64CEFB" }}>*</span>
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className="lv-input w-full rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5">
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="lv-input w-full rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">
                    Business Type <span style={{ color: "#64CEFB" }}>*</span>
                  </label>
                  <select
                    name="businessType"
                    required
                    defaultValue=""
                    className="lv-input w-full rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/40 cursor-pointer"
                  >
                    <option value="" disabled>
                      Select your profession
                    </option>
                    <option>Lawyer</option>
                    <option>Insurance Agent</option>
                    <option>Chiropractor</option>
                    <option>Dentist</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">
                    Notes
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Anything specific you'd like to cover?"
                    className="lv-input rounded-lg px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#64CEFB]/40"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold text-white transition-transform disabled:opacity-60 hover:scale-[1.01]"
                  style={{
                    background:
                      "linear-gradient(180deg, #4F7AF5 0%, #3D63E0 100%)",
                    boxShadow:
                      "0 8px 22px rgba(79,122,245,0.40), inset 0 1px 0 rgba(255,255,255,0.20)",
                    minHeight: 44,
                  }}
                >
                  {submitting ? "Booking..." : "Confirm Appointment"}
                </button>
              </div>
            </motion.form>
          )}

          {step === "confirmed" && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(100,206,251,0.20), rgba(167,139,250,0.20))",
                  border: "1px solid rgba(100,206,251,0.45)",
                }}
              >
                <Check size={28} color="#64CEFB" strokeWidth={2.5} />
              </motion.div>
              <h4 className="text-2xl font-bold text-white mb-2">
                You&apos;re booked.
              </h4>
              <p className="text-white/65 text-sm">
                Check your inbox — we&apos;ll send a calendar invite for{" "}
                <span className="text-white font-medium">{summaryLine}</span>{" "}
                shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
