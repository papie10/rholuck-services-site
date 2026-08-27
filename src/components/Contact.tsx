import { useEffect, useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { courses, socials } from "../data/content"
import { FacebookIcon, LinkedInIcon, XIcon } from "./SocialIcons"
import Reveal3D from "./Reveal3D"

const iconMap = { LinkedIn: LinkedInIcon, Facebook: FacebookIcon, X: XIcon }
import { useEnquiry, type RequestType, type DeliveryMode } from "../context/EnquiryContext"

const requestOptions: { value: RequestType; label: string }[] = [
  { value: "", label: "Select an option" },
  { value: "environmental", label: "Environmental Consultancy (EIA, EAR, monitoring)" },
  { value: "training", label: "HSE Training Enrollment" },
  { value: "fire-safety", label: "Fire & Life Safety Systems (supply/installation)" },
  { value: "laboratory", label: "Chemical Laboratory Services" },
  { value: "other", label: "Something else" },
]

export default function Contact() {
  const { requestType, course, deliveryMode, setEnquiry } = useEnquiry()
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" })
  const [type, setType] = useState<RequestType>(requestType)
  const [selectedCourse, setSelectedCourse] = useState(course)
  const [mode, setMode] = useState<DeliveryMode>(deliveryMode)

  // Sync local dropdown state whenever an Enroll / Request button elsewhere sets the shared enquiry
  useEffect(() => {
    setType(requestType)
    setSelectedCourse(course)
    setMode(deliveryMode)
  }, [requestType, course, deliveryMode])

  const requestLabel = requestOptions.find((o) => o.value === type)?.label ?? ""
  const modeLabel = mode === "online" ? "Online" : mode === "in-person" ? "In-person" : ""
  const subjectBits = [requestLabel, type === "training" ? selectedCourse : ""].filter(Boolean)

  const mailtoHref = `mailto:info@rholuckng.com?subject=${encodeURIComponent(
    `Enquiry: ${subjectBits.join(" — ") || "Website enquiry"} — ${form.company || form.name}`
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nRequest type: ${requestLabel}${
      type === "training" ? `\nCourse: ${selectedCourse}\nPreferred format: ${modeLabel || "Not specified"}` : ""
    }\n\nMessage:\n${form.message}`
  )}`

  return (
    <section id="contact" className="bg-paper-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <Reveal3D>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">Get In Touch</p>
            <h2 className="font-display text-4xl md:text-5xl uppercase leading-tight text-navy-900 mb-8">
              Let's build your
              <br />
              HSE management system
            </h2>
            <p className="text-steel-600 text-lg leading-relaxed mb-10 max-w-md">
              Reach out for environmental consultancy, HSE training bookings or fire
              safety installation. Our team responds within one business day.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin size={22} className="shrink-0 text-amber-600 mt-0.5" />
                <p className="text-navy-900">
                  #7, Unity Close, Unity Estate, Off Segun Kujore Street,
                  <br />
                  Off CMD Road, By GTB, Magodo, Shangisha, Lagos State, Nigeria.
                </p>
              </div>
              <div className="flex gap-4">
                <Phone size={22} className="shrink-0 text-amber-600 mt-0.5" />
                <p className="text-navy-900">
                  0802 842 7429 &nbsp;·&nbsp; 0706 228 8830
                  <br />
                  0806 404 6790 &nbsp;·&nbsp; 0809 821 7205
                </p>
              </div>
              <div className="flex gap-4">
                <Mail size={22} className="shrink-0 text-amber-600 mt-0.5" />
                <p className="text-navy-900">
                  info@rholuckng.com
                  <br />
                  rholuckservices@gmail.com
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-steel-400">
                Follow us
              </span>
              {socials.map((s) => {
                const Icon = iconMap[s.name as keyof typeof iconMap]
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="text-navy-900 hover:text-amber-600 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>
          </Reveal3D>

          <form action={mailtoHref} method="get" className="bg-white border border-steel-200 p-8">
            <label className="text-sm block mb-5">
              <span className="block mb-2 font-medium text-navy-900">
                What do you need help with?
              </span>
              <select
                required
                value={type}
                onChange={(e) => {
                  const val = e.target.value as RequestType
                  setType(val)
                  setEnquiry(val, val === "training" ? selectedCourse : "")
                }}
                className="w-full border border-steel-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {requestOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            {type === "training" && (
              <label className="text-sm block mb-5">
                <span className="block mb-2 font-medium text-navy-900">Which course?</span>
                <select
                  required
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value)
                    setEnquiry("training", e.target.value)
                  }}
                  className="w-full border border-steel-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.title} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {type === "training" && (
              <label className="text-sm block mb-5">
                <span className="block mb-2 font-medium text-navy-900">Preferred format</span>
                <div className="grid grid-cols-2 gap-3">
                  {(["in-person", "online"] as DeliveryMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMode(m)
                        setEnquiry("training", selectedCourse, m)
                      }}
                      className={`rounded-sm border px-4 py-3 text-sm font-medium transition-colors ${
                        mode === m
                          ? "border-amber-500 bg-amber-500 text-navy-950"
                          : "border-steel-200 text-steel-600 hover:border-amber-500"
                      }`}
                    >
                      {m === "online" ? "Online" : "In-person"}
                    </button>
                  ))}
                </div>
              </label>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="text-sm">
                <span className="block mb-2 font-medium text-navy-900">Full name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-steel-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </label>
              <label className="text-sm">
                <span className="block mb-2 font-medium text-navy-900">Company</span>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full border border-steel-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </label>
            </div>
            <label className="text-sm block mt-5">
              <span className="block mb-2 font-medium text-navy-900">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-steel-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </label>
            <label className="text-sm block mt-5">
              <span className="block mb-2 font-medium text-navy-900">
                {type === "training" ? "Anything else we should know?" : "What do you need help with?"}
              </span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={
                  type === "training"
                    ? "Number of participants, preferred dates, location..."
                    : undefined
                }
                className="w-full border border-steel-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-sm bg-navy-950 py-3.5 font-semibold text-white hover:bg-navy-800 transition-colors"
            >
              {type === "training" ? "Submit Enrollment" : "Send Enquiry"}
            </button>
            <p className="mt-3 text-xs text-steel-400">
              Opens your email client with this message addressed to info@rholuckng.com.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
