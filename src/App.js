import { useState } from "react";

import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

console.log("FUNCIONA APP");

const G = {
bg: "#f7f7f6",
surface: "#ffffff",
border: "#e4e4e0",
borderStrong: "#c8c8c2",
text: "#111110",
textMid: "#4a4a52",
textLight: "#8f8f96",
accent: "#1a3a6b",
accentLight: "#e8edf5",
accentBorder: "#b8c8e0",
green: "#0f6b3a",
greenBg: "#f0faf4",
greenBorder: "#9dd3b4",
red: "#c0392b",
redBg: "#fdf4f3",
redBorder: "#e8aea8",
amber: "#92600a",
amberBg: "#fdf8ee",
amberBorder: "#e8d090",
gray: "#6b6b72",
radius: "6px",
radiusMd: "10px",
shadow: "0 1px 4px rgba(0,0,0,0.06)",
shadowMd: "0 4px 16px rgba(0,0,0,0.08)",
};

const css = `@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap'); *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${G.bg}; } input, select, textarea { font-family: 'DM Sans', sans-serif; } .inp:focus { outline: none; border-color: ${G.accent} !important; box-shadow: 0 0 0 3px rgba(26,58,107,0.1); } textarea:focus { outline: none; border-color: ${G.accent} !important; box-shadow: 0 0 0 3px rgba(26,58,107,0.1); } select:focus { outline: none; border-color: ${G.accent} !important; box-shadow: 0 0 0 3px rgba(26,58,107,0.1); } .radio-opt:hover { border-color: ${G.accent} !important; background: ${G.accentLight} !important; } .chip-opt:hover { border-color: ${G.accent} !important; } .section-card { transition: box-shadow 0.2s; } .btn-add:hover { background: ${G.accentLight} !important; border-color: ${G.accent} !important; color: ${G.accent} !important; } .progress-bar { transition: width 0.5s cubic-bezier(0.4,0,0.2,1); } @media (max-width: 680px) { .grid-2 { grid-template-columns: 1fr !important; } .pad { padding: 20px 16px !important; } }`;

const inpStyle = {
width: "100%", padding: "9px 12px",
border: `1px solid ${G.border}`, borderRadius: G.radius,
fontSize: 13, color: G.text, background: G.surface,
transition: "border-color 0.15s, box-shadow 0.15s",
fontFamily: "‘DM Sans’, sans-serif",
};

// SVG Icons
const IconUser = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
</svg>
);
const IconPhone = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
</svg>
);
const IconHome = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
</svg>
);
const IconBuilding = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M9 3v18M15 3v18M2 9h20M2 15h20"/>
</svg>
);
const IconShield = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
</svg>
);
const IconDollar = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
</svg>
);
const IconUsers = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
</svg>
);
const IconFile = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
</svg>
);
const IconActivity = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
</svg>
);
const IconNotes = () => (
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
</svg>
);
const IconCheck = () => (
<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
<polyline points="20 6 9 17 4 12"/>
</svg>
);
const IconPlus = () => (
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
</svg>
);

// ─── UI Components ──────────────────────────────────────────────────────────

function Label({ children, required }) {
return (
<div style={{ fontSize: 11, fontWeight: 600, color: G.textLight, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7, display: "flex", gap: 4, alignItems: "center" }}>
{children}
{required && <span style={{ color: G.red, fontSize: 10 }}>*</span>}
</div>
);
}

function Field({ label, required, children, note }) {
return (
<div style={{ marginBottom: 20 }}>
<Label required={required}>{label}</Label>
{children}
{note && <div style={{ fontSize: 11, color: G.textLight, marginTop: 5, lineHeight: 1.5 }}>{note}</div>}
</div>
);
}

function TextInput({ label, required, placeholder, value, onChange, type = "text", note }) {
return (
<Field label={label} required={required} note={note}>
<input className="inp" style={inpStyle} type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
</Field>
);
}

function SelectInput({ label, required, options, value, onChange, note }) {
return (
<Field label={label} required={required} note={note}>
<select className="inp" style={{ ...inpStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%238f8f96' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32, appearance: "none" }}
value={value} onChange={e => onChange(e.target.value)}>
<option value="">— Selecciona —</option>
{options.map(o => <option key={o} value={o}>{o}</option>)}
</select>
</Field>
);
}

function RadioGroup({ label, required, options, value, onChange, note }) {
return (
<Field label={label} required={required} note={note}>
<div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
{options.map(opt => (
<div key={opt} className="radio-opt" onClick={() => onChange(opt)}
style={{
display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
border: `1px solid ${value === opt ? G.accent : G.border}`,
borderRadius: G.radius, cursor: "pointer", userSelect: "none",
background: value === opt ? G.accentLight : G.surface,
transition: "all 0.15s",
}}>
<div style={{
width: 15, height: 15, borderRadius: "50%", flexShrink: 0,
border: `2px solid ${value === opt ? G.accent : G.borderStrong}`,
background: value === opt ? G.accent : "transparent",
display: "flex", alignItems: "center", justifyContent: "center",
transition: "all 0.15s",
}}>
{value === opt && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
</div>
<span style={{ fontSize: 13, color: value === opt ? G.accent : G.textMid, fontWeight: value === opt ? 500 : 400 }}>{opt}</span>
</div>
))}
</div>
</Field>
);
}

function CheckGroup({ label, required, options, values, onChange, note }) {
return (
<Field label={label} required={required} note={note}>
<div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
{options.map(opt => {
const checked = values.includes(opt);
return (
<div key={opt} className="radio-opt" onClick={() => onChange(checked ? values.filter(v => v !== opt) : [...values, opt])}
style={{
display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
border: `1px solid ${checked ? G.accent : G.border}`,
borderRadius: G.radius, cursor: "pointer", userSelect: "none",
background: checked ? G.accentLight : G.surface,
transition: "all 0.15s",
}}>
<div style={{
width: 15, height: 15, borderRadius: 4, flexShrink: 0,
border: `2px solid ${checked ? G.accent : G.borderStrong}`,
background: checked ? G.accent : "transparent",
display: "flex", alignItems: "center", justifyContent: "center",
color: "#fff", transition: "all 0.15s",
}}>
{checked && <IconCheck />}
</div>
<span style={{ fontSize: 13, color: checked ? G.accent : G.textMid, fontWeight: checked ? 500 : 400 }}>{opt}</span>
</div>
);
})}
</div>
</Field>
);
}

function TextArea({ label, required, placeholder, value, onChange, rows = 3, note }) {
return (
<Field label={label} required={required} note={note}>
<textarea className="inp" style={{ ...inpStyle, minHeight: rows * 36, resize: "vertical", lineHeight: 1.65 }}
placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
</Field>
);
}

function Divider({ label }) {
return (
<div style={{ display: "flex", alignItems: "center", gap: 14, margin: "28px 0 24px" }}>
<div style={{ flex: 1, height: 1, background: G.border }} />
{label && <span style={{ fontSize: 10, fontWeight: 700, color: G.textLight, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{label}</span>}
<div style={{ flex: 1, height: 1, background: G.border }} />
</div>
);
}

function SectionCard({ icon: Icon, number, title, color = G.accent, children }) {
return (
<div className="section-card" style={{
background: G.surface, border: `1px solid ${G.border}`,
borderRadius: G.radiusMd, overflow: "hidden", marginBottom: 16,
}}>
{/* Section header */}
<div style={{
display: "flex", alignItems: "center", gap: 12,
padding: "14px 24px", borderBottom: `1px solid ${G.border}`,
background: "#fafaf9",
}}>
<div style={{
width: 28, height: 28, borderRadius: 6, flexShrink: 0,
background: color === G.accent ? G.accentLight : `${color}18`,
border: `1px solid ${color === G.accent ? G.accentBorder : `${color}40`}`,
color: color, display: "flex", alignItems: "center", justifyContent: "center",
}}>
<Icon />
</div>
<div style={{ flex: 1 }}>
<div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
<span style={{ fontSize: 10, fontWeight: 700, color: G.textLight, fontFamily: "‘DM Mono’, monospace", letterSpacing: "0.06em" }}>{number}</span>
<span style={{ fontSize: 14, fontWeight: 600, color: G.text, fontFamily: "‘EB Garamond’, serif", letterSpacing: "-0.01em" }}>{title}</span>
</div>
</div>
</div>
<div style={{ padding: "24px" }}>
{children}
</div>
</div>
);
}

function Callout({ type = "info", children }) {
const colors = {
info: [G.accent, G.accentLight, G.accentBorder],
warning: [G.amber, G.amberBg, G.amberBorder],
note: [G.gray, G.bg, G.border],
};
const [c, bg, b] = colors[type];
return (
<div style={{
padding: "12px 16px", borderRadius: G.radius, marginBottom: 24,
background: bg, border: `1px solid ${b}`,
borderLeft: `3px solid ${c}`,
fontSize: 13, color: G.textMid, lineHeight: 1.65,
}}>
{children}
</div>
);
}

// ─── Upload Field ────────────────────────────────────────────────────────────
function UploadField({ label, desc }) {
const [file, setFile] = useState(null);
return (
<div style={{ marginBottom: 12 }}>
<div style={{
border: `1px dashed ${file ? G.green : G.borderStrong}`,
borderRadius: G.radius, padding: "14px 16px",
background: file ? G.greenBg : G.bg,
display: "flex", alignItems: "center", gap: 12,
transition: "all 0.15s",
}}>
<div style={{
width: 32, height: 32, borderRadius: 6, flexShrink: 0,
background: file ? G.greenBorder : G.border,
display: "flex", alignItems: "center", justifyContent: "center",
color: file ? G.green : G.textLight,
}}>
<IconFile />
</div>
<div style={{ flex: 1, minWidth: 0 }}>
<div style={{ fontSize: 13, fontWeight: 500, color: G.text }}>{label}</div>
{desc && <div style={{ fontSize: 11, color: G.textLight, marginTop: 2 }}>{desc}</div>}
{file && <div style={{ fontSize: 11, color: G.green, marginTop: 3, fontWeight: 500 }}>{file.name}</div>}
</div>
<label style={{
fontSize: 12, fontWeight: 600, color: G.accent, cursor: "pointer",
padding: "5px 10px", border: `1px solid ${G.accentBorder}`,
borderRadius: G.radius, background: G.accentLight, whiteSpace: "nowrap",
transition: "all 0.15s",
}}>
{file ? "Cambiar" : "Adjuntar"}
<input type="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
</label>
</div>
</div>
);
}

// ─── Beneficiary Entry ───────────────────────────────────────────────────────
function BeneficiaryEntry({ index, data, onChange, onRemove }) {
const set = (k, v) => onChange({ ...data, [k]: v });
return (
<div style={{
border: `1px solid ${G.border}`, borderRadius: G.radius,
padding: "16px", marginBottom: 12, background: G.bg,
}}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
<span style={{ fontSize: 11, fontWeight: 700, color: G.textLight, letterSpacing: "0.07em", textTransform: "uppercase" }}>Beneficiario {index + 1}</span>
{index > 0 && (
<button onClick={onRemove} style={{ fontSize: 11, color: G.red, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Eliminar</button>
)}
</div>
<div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
<TextInput label="Nombre completo" value={data.nombre} onChange={v => set("nombre", v)} placeholder="Nombre completo" />
<TextInput label="Relación" value={data.relacion} onChange={v => set("relacion", v)} placeholder="Esposa, hijo, etc." />
<TextInput label="Porcentaje asignado (%)" value={data.porcentaje} onChange={v => set("porcentaje", v)} placeholder="Ej: 60" type="number" />
<TextInput label="Fecha aprox. de registro" value={data.fecha} onChange={v => set("fecha", v)} type="month" />
</div>
</div>
);
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function App() {
// Progress
const SECTIONS = 10;

// State
const [datos, setDatos] = useState({
nombre: "", fechaNacimiento: "", edad: "", curp: "", rfc: "", clabe: "", estadoCivil: "",
celular: "", correo: "", celularPrincipal: "",
calle: "", colonia: "", ciudad: "", estado: "", cp: "",
empresa: "", puesto: "", direccionLaboral: "", tipoContratacion: "",
seguroActivo: "", seguroPasado: "",
aseguradora: "", tipoSeguro: [], contratadoDonde: "", fechaContratacion: "", fechaCancelacion: "",
frecuenciaPago: "", montoPago: "", montoCobertura: "",
tieneBeneficiarios: "",
beneficiariosAnteriores: "", relacionAnterior: "", cambiosBeneficiarios: "",
estatusPoliza: "", tiempoCancelacion: "", motivoCancelacion: "",
notasAdicionales: "", interesRecuperar: "",
});

const [beneficiarios, setBeneficiarios] = useState([{ nombre: "", relacion: "", porcentaje: "", fecha: "" }]);
const [submitted, setSubmitted] = useState(false);

const set = (k, v) => setDatos(p => ({ ...p, [k]: v }));

const completedFields = [
datos.nombre, datos.fechaNacimiento, datos.celular, datos.correo,
datos.calle, datos.ciudad, datos.seguroActivo, datos.tieneBeneficiarios,
datos.estatusPoliza, datos.interesRecuperar,
].filter(Boolean).length;
const progress = Math.round((completedFields / SECTIONS) * 100);

if (submitted) {
return (
<div style={{ minHeight: "100vh", background: G.bg, fontFamily: "‘DM Sans’, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
<style>{css}</style>
<div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
<div style={{ width: 64, height: 64, borderRadius: "50%", background: G.greenBg, border: `1px solid ${G.greenBorder}`, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", color: G.green }}>
<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<polyline points="20 6 9 17 4 12"/>
</svg>
</div>
<h2 style={{ fontSize: 26, fontWeight: 500, fontFamily: "‘EB Garamond’, serif", color: G.text, marginBottom: 10, letterSpacing: "-0.02em" }}>Expediente recibido</h2>
<p style={{ fontSize: 14, color: G.textMid, lineHeight: 1.7, marginBottom: 28 }}>
Su información ha sido registrada correctamente. Un asesor se pondrá en contacto en un plazo de 24–48 horas hábiles para continuar con el proceso de validación.
</p>
<div style={{ padding: "14px 18px", borderRadius: G.radius, background: G.amberBg, border: `1px solid ${G.amberBorder}`, fontSize: 12, color: G.amber, lineHeight: 1.6, textAlign: "left" }}>
Conserve a la mano su documentación: INE, talones de nómina y estado de cuenta. Es posible que le sean solicitados durante el proceso.
</div>
<button onClick={() => setSubmitted(false)} style={{ marginTop: 24, padding: "10px 20px", borderRadius: G.radius, border: `1px solid ${G.border}`, background: G.surface, fontSize: 13, color: G.textMid, cursor: "pointer", fontFamily: "inherit" }}>
Volver al cuestionario
</button>
</div>
</div>
);
}

return (
<div style={{ minHeight: "100vh", background: G.bg, fontFamily: "‘DM Sans’, sans-serif", color: G.text }}>
<style>{css}</style>

```
  {/* ── TOP BAR ── */}
  <div style={{ background: G.surface, borderBottom: `1px solid ${G.border}`, position: "sticky", top: 0, zIndex: 50 }}>
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em", color: G.accent }}>VALIDACIÓN DE EXPEDIENTE</span>
          </div>
          <span style={{ width: 1, height: 16, background: G.border }} />
          <span style={{ fontSize: 11, color: G.textLight, fontFamily: "'DM Mono', monospace" }}>FORM·VAL·2025</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, color: G.textLight }}>{progress}% completado</span>
          <div style={{ width: 80, height: 4, borderRadius: 2, background: G.border, overflow: "hidden" }}>
            <div className="progress-bar" style={{ height: "100%", width: `${progress}%`, background: G.accent, borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* ── CONTENT ── */}
  <div className="pad" style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px 80px" }}>

    {/* Header */}
    <div style={{ marginBottom: 32, paddingBottom: 28, borderBottom: `1px solid ${G.border}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: G.textLight, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Uso interno · Confidencial</div>
      <h1 style={{ fontSize: 30, fontWeight: 500, fontFamily: "'EB Garamond', serif", letterSpacing: "-0.02em", color: G.text, lineHeight: 1.15, marginBottom: 14 }}>
        Evaluación de Expediente<br />de Aseguramiento
      </h1>
      <div style={{ maxWidth: 580, padding: "14px 18px", borderRadius: G.radius, background: G.accentLight, border: `1px solid ${G.accentBorder}`, borderLeft: `3px solid ${G.accent}` }}>
        <p style={{ fontSize: 13, color: G.textMid, lineHeight: 1.7 }}>
          Este cuestionario tiene como objetivo recuperar información de pólizas activas o previas para validar su historial de aseguramiento, coberturas y beneficiarios. La información será utilizada como requisito exclusivo para el análisis, valoración o recuperación de procesos.
        </p>
      </div>
    </div>

    {/* 1. DATOS PERSONALES */}
    <SectionCard icon={IconUser} number="01" title="Datos Personales" color={G.accent}>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <TextInput label="Nombre completo" required value={datos.nombre} onChange={v => set("nombre", v)} placeholder="Nombre(s) y apellidos" />
        <TextInput label="Fecha de nacimiento" required value={datos.fechaNacimiento} onChange={v => set("fechaNacimiento", v)} type="date" />
        <TextInput label="Edad" value={datos.edad} onChange={v => set("edad", v)} type="number" placeholder="Años cumplidos" />
        <SelectInput label="Estado civil" value={datos.estadoCivil} onChange={v => set("estadoCivil", v)}
          options={["Soltero(a)", "Casado(a)", "Divorciado(a)", "Viudo(a)", "Unión libre"]} />
      </div>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <TextInput label="CURP" value={datos.curp} onChange={v => set("curp", v)} placeholder="CURP a 18 caracteres" />
        <TextInput label="RFC" value={datos.rfc} onChange={v => set("rfc", v)} placeholder="RFC con homoclave" />
        <TextInput label="Clave de Servidor Público" value={datos.clabe} onChange={v => set("clabe", v)} placeholder="Tal como aparece en su talón de nómina" note="Solo si aplica para su institución." />
      </div>
    </SectionCard>

    {/* 2. CONTACTO */}
    <SectionCard icon={IconPhone} number="02" title="Datos de Contacto" color={G.accent}>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <TextInput label="Número de celular" required value={datos.celular} onChange={v => set("celular", v)} placeholder="10 dígitos" type="tel" />
        <TextInput label="Correo electrónico" required value={datos.correo} onChange={v => set("correo", v)} placeholder="correo@ejemplo.com" type="email" />
      </div>
      <RadioGroup label="¿Este número es el principal de contacto?" required
        value={datos.celularPrincipal} onChange={v => set("celularPrincipal", v)}
        options={["Sí, es mi número principal", "No, prefiero ser contactado por otro medio"]} />
    </SectionCard>

    {/* 3. DOMICILIO PARTICULAR */}
    <SectionCard icon={IconHome} number="03" title="Domicilio Particular" color={G.textMid}>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <TextInput label="Calle y número" required value={datos.calle} onChange={v => set("calle", v)} placeholder="Calle, número exterior e interior" />
        <TextInput label="Colonia" value={datos.colonia} onChange={v => set("colonia", v)} placeholder="Colonia o fraccionamiento" />
        <TextInput label="Ciudad / Municipio" required value={datos.ciudad} onChange={v => set("ciudad", v)} placeholder="Ciudad" />
        <TextInput label="Estado" value={datos.estado} onChange={v => set("estado", v)} placeholder="Estado de la república" />
        <TextInput label="Código postal" value={datos.cp} onChange={v => set("cp", v)} placeholder="5 dígitos" />
      </div>
    </SectionCard>

    {/* 4. DOMICILIO LABORAL */}
    <SectionCard icon={IconBuilding} number="04" title="Domicilio Laboral / Área de Trabajo" color={G.textMid}>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <TextInput label="Empresa o institución" value={datos.empresa} onChange={v => set("empresa", v)} placeholder="Nombre de la empresa o dependencia" />
        <TextInput label="Puesto o área" value={datos.puesto} onChange={v => set("puesto", v)} placeholder="Cargo o departamento" />
        <TextInput label="Dirección laboral" value={datos.direccionLaboral} onChange={v => set("direccionLaboral", v)} placeholder="Dirección (si aplica)" />
        <SelectInput label="Tipo de contratación" value={datos.tipoContratacion} onChange={v => set("tipoContratacion", v)}
          options={["Planta / Base", "Temporal", "Honorarios", "Comisionado", "Confianza", "Otro"]} />
      </div>
    </SectionCard>

    {/* 5. HISTORIAL DE SEGUROS */}
    <SectionCard icon={IconShield} number="05" title="Historial de Seguros" color={G.accent}>
      <Callout type="info">
        Complete esta sección con la información que recuerde. No es necesario tener datos exactos; cualquier referencia es de utilidad para el proceso de validación.
      </Callout>

      <RadioGroup label="¿Actualmente tiene algún seguro activo?" required
        value={datos.seguroActivo} onChange={v => set("seguroActivo", v)}
        options={["Sí, tengo seguro activo", "No tengo seguro activo", "No estoy seguro(a)"]} />

      <RadioGroup label="¿Ha tenido seguros en el pasado?" required
        value={datos.seguroPasado} onChange={v => set("seguroPasado", v)}
        options={["Sí, tuve seguros anteriores", "No, nunca he tenido"]} />

      {(datos.seguroActivo || datos.seguroPasado) && (
        <>
          <Divider label="Detalle del seguro" />
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <TextInput label="Nombre de la aseguradora" value={datos.aseguradora} onChange={v => set("aseguradora", v)}
              placeholder="Ej: GNP, MetLife, AXA, Allianz..." note="Escriba el nombre que recuerde aproximadamente." />
            <SelectInput label="¿Dónde tenía contratado el seguro?" value={datos.contratadoDonde} onChange={v => set("contratadoDonde", v)}
              options={["Nómina / empresa", "Agente independiente", "Banco", "Institución pública", "No recuerdo"]} />
            <TextInput label="Fecha aprox. de contratación" value={datos.fechaContratacion} onChange={v => set("fechaContratacion", v)} type="month" />
            <TextInput label="Fecha aprox. de cancelación" value={datos.fechaCancelacion} onChange={v => set("fechaCancelacion", v)} type="month"
              note="Solo si el seguro fue cancelado." />
          </div>
          <CheckGroup label="Tipo de seguro (seleccione los que apliquen)"
            options={["Gastos Médicos Mayores", "Vida Individual", "Vida Familiar", "Accidentes Personales", "Invalidez Total", "Automotriz", "Otro"]}
            values={datos.tipoSeguro} onChange={v => set("tipoSeguro", v)} />
        </>
      )}
    </SectionCard>

    {/* 6. PAGOS Y COBERTURA */}
    <SectionCard icon={IconDollar} number="06" title="Pagos y Cobertura" color={G.green}>
      <Callout type="note">Proporcione los datos que recuerde aproximadamente. Si no tiene certeza, puede dejar el campo vacío o indicar "No recuerdo".</Callout>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
        <SelectInput label="Frecuencia de pago" value={datos.frecuenciaPago} onChange={v => set("frecuenciaPago", v)}
          options={["Mensual", "Quincenal", "Anual", "No recuerdo"]} />
        <TextInput label="Monto aproximado de prima" value={datos.montoPago} onChange={v => set("montoPago", v)} placeholder="Ej: $850, $1,700..." />
      </div>
      <SelectInput label="Monto de cobertura aproximado" value={datos.montoCobertura} onChange={v => set("montoCobertura", v)}
        options={["Menos de $500,000", "$500,000 – $1,000,000", "$1,000,000 – $3,000,000", "Más de $3,000,000", "No recuerdo"]} />
    </SectionCard>

    {/* 7. BENEFICIARIOS */}
    <SectionCard icon={IconUsers} number="07" title="Beneficiarios" color={G.accent}>
      <RadioGroup label="¿Tiene o ha tenido beneficiarios asignados en alguna póliza?" required
        value={datos.tieneBeneficiarios} onChange={v => set("tieneBeneficiarios", v)}
        options={[
          "Sí, actualmente tengo beneficiarios",
          "Tuve beneficiarios en el pasado",
          "No recuerdo, pero deseo añadir uno",
        ]} />

      {(datos.tieneBeneficiarios === "Sí, actualmente tengo beneficiarios" || datos.tieneBeneficiarios === "Tuve beneficiarios en el pasado" || datos.tieneBeneficiarios === "No recuerdo, pero deseo añadir uno") && (
        <>
          <Divider label="Beneficiarios actuales o más recientes" />
          <Callout type="note">Complete la información aunque sea de manera aproximada.</Callout>

          {beneficiarios.map((b, i) => (
            <BeneficiaryEntry key={i} index={i} data={b}
              onChange={data => setBeneficiarios(prev => prev.map((x, j) => j === i ? data : x))}
              onRemove={() => setBeneficiarios(prev => prev.filter((_, j) => j !== i))} />
          ))}

          {beneficiarios.length < 4 && (
            <button className="btn-add" onClick={() => setBeneficiarios(p => [...p, { nombre: "", relacion: "", porcentaje: "", fecha: "" }])}
              style={{
                display: "flex", alignItems: "center", gap: 7, padding: "8px 14px",
                border: `1px dashed ${G.borderStrong}`, borderRadius: G.radius,
                background: G.bg, color: G.textMid, fontSize: 12, fontWeight: 500,
                cursor: "pointer", fontFamily: "inherit", marginBottom: 20, transition: "all 0.15s",
              }}>
              <IconPlus /> Agregar otro beneficiario
            </button>
          )}

          <Divider label="Beneficiarios anteriores (si aplica)" />
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <TextArea label="Nombre(s) de beneficiarios anteriores" rows={2} value={datos.beneficiariosAnteriores}
              onChange={v => set("beneficiariosAnteriores", v)} placeholder="Nombre(s) que recuerde" />
            <TextInput label="Relación con el titular" value={datos.relacionAnterior} onChange={v => set("relacionAnterior", v)} placeholder="Esposa, hijo, madre..." />
          </div>
          <RadioGroup label="¿Los beneficiarios siguen siendo los mismos o fueron modificados?"
            value={datos.cambiosBeneficiarios} onChange={v => set("cambiosBeneficiarios", v)}
            options={["Se mantuvieron igual", "Fueron modificados", "No recuerdo"]} />
        </>
      )}
    </SectionCard>

    {/* 8. DOCUMENTOS */}
    <SectionCard icon={IconFile} number="08" title="Documentos Requeridos" color={G.amber}>
      <Callout type="warning">
        Adjunte los documentos actualizados. El talón de nómina antiguo es opcional pero puede servir como referencia para verificar información de seguros anteriores.
      </Callout>
      <UploadField label="INE / Credencial de elector (frente)" desc="Documento vigente, legible" />
      <UploadField label="INE / Credencial de elector (reverso)" desc="Documento vigente, legible" />
      <UploadField label="Último talón de nómina" desc="El más reciente disponible" />
      <UploadField label="Talón de nómina antiguo" desc="Opcional — para verificación de seguros anteriores" />
      <UploadField label="Estado de cuenta bancario reciente" desc="Del último mes, que muestre nombre y CLABE" />
    </SectionCard>

    {/* 9. ESTATUS DE PÓLIZA */}
    <SectionCard icon={IconActivity} number="09" title="Estatus de Póliza" color={G.red}>
      <RadioGroup label="¿Cómo describiría su situación actual respecto a su(s) póliza(s)?" required
        value={datos.estatusPoliza} onChange={v => set("estatusPoliza", v)}
        options={[
          "Tengo póliza activa",
          "Tuve póliza pero la cancelé",
          "Creo que tengo póliza pero no estoy seguro(a)",
          "Nunca he tenido seguro",
        ]} />

      {datos.estatusPoliza === "Tuve póliza pero la cancelé" && (
        <>
          <Divider label="Detalle de cancelación" />
          <RadioGroup label="¿Hace cuánto tiempo aproximadamente fue cancelada?"
            value={datos.tiempoCancelacion} onChange={v => set("tiempoCancelacion", v)}
            options={["Menos de 6 meses", "6 meses – 1 año", "1 – 3 años", "Más de 3 años"]} />
          <RadioGroup label="Motivo de cancelación (si lo recuerda)"
            value={datos.motivoCancelacion} onChange={v => set("motivoCancelacion", v)}
            options={["Costo elevado de la prima", "Cambio de trabajo", "Falta de uso / cobertura no requerida", "Otro motivo"]} />
        </>
      )}
    </SectionCard>

    {/* 10. NOTAS ADICIONALES */}
    <SectionCard icon={IconNotes} number="10" title="Notas Adicionales" color={G.textMid}>
      <TextArea label="¿Hay algo que recuerde sobre su seguro anterior que considere importante?"
        rows={4} value={datos.notasAdicionales} onChange={v => set("notasAdicionales", v)}
        placeholder="Cualquier dato adicional que pueda ser relevante para su expediente..." />
      <RadioGroup label="¿Le interesa recuperar o mejorar su cobertura actual?" required
        value={datos.interesRecuperar} onChange={v => set("interesRecuperar", v)}
        options={["Sí, me interesa", "No por el momento", "Tal vez, deseo más información"]} />
    </SectionCard>

    {/* Footer / Submit */}
    <div style={{ marginTop: 12, padding: "20px 24px", background: G.surface, border: `1px solid ${G.border}`, borderRadius: G.radiusMd }}>
      <div style={{ fontSize: 11, color: G.textLight, lineHeight: 1.7, marginBottom: 20 }}>
        Al enviar este formulario, confirma que la información proporcionada es verídica y corresponde a su historial real de aseguramiento. Los datos serán tratados de forma confidencial conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 80, height: 4, borderRadius: 2, background: G.border, overflow: "hidden" }}>
            <div className="progress-bar" style={{ height: "100%", width: `${progress}%`, background: progress === 100 ? G.green : G.accent, borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 12, color: G.textLight }}>{progress}% completado</span>
        </div>
        <button onClick={async () => {
  try {
    await addDoc(collection(db, "clientes"), {
      ...datos,
      fecha: new Date()
    });
    setSubmitted(true);
  } catch (error) {
    console.error("Error guardando:", error);
  }
}}
          style={{
            padding: "11px 28px", borderRadius: G.radius,
            background: G.accent, color: "#fff", border: "none",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.01em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.target.style.opacity = "0.88"}
          onMouseLeave={e => e.target.style.opacity = "1"}>
          Enviar expediente
        </button>
      </div>
    </div>
  </div>
</div>
);
}
