"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Trophy, Clock, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const INTERESTS = [
  ["Teknologi dan AI", "technology"],
  ["Data dan analisis", "data"],
  ["Komunitas dan kegiatan sosial", "community"],
  ["Pemberdayaan perempuan", "women_empowerment"],
  ["Lingkungan dan keberlanjutan", "environment"],
  ["Pendidikan dan belajar", "learning"],
  ["Komunikasi dan kepemimpinan", "communication"],
  ["Desain dan kreativitas", "design"],
  ["Karier dan pengembangan diri", "career"],
  ["Menulis dan membaca", "writing"],
];

const SKILLS = [
  ["Literasi digital", "digital_literacy"],
  ["Python dasar", "python_basic"],
  ["Analisis data", "data_analysis"],
  ["Spreadsheet/Excel", "spreadsheet"],
  ["Komunikasi", "communication"],
  ["Kerja sama tim", "teamwork"],
  ["Menulis", "writing"],
  ["Desain", "design"],
  ["Presentasi", "presentation"],
  ["Mengajar", "teaching"],
  ["Organisasi kegiatan", "organization"],
  ["Membaca", "reading"],
  ["Berpikir kritis", "critical_thinking"],
  ["Pemecahan masalah", "problem_solving"],
  ["Saya masih pemula/belum yakin", "beginner"],
];

const HABITS = [
  ["Belajar mandiri", "self_learning"],
  ["Membaca", "reading"],
  ["Konsisten menjalankan rutinitas", "consistency"],
  ["Bekerja dengan orang lain", "teamwork"],
  ["Menjadi relawan", "volunteering"],
  ["Aktivitas luar ruangan", "outdoor_activity"],
  ["Mencoba dan membuat proyek", "problem_solving"],
];

function MultiSelect({ title, options, value, onChange }) {
  function toggle(feature) {
    if (value.includes(feature)) {
      onChange(value.filter((item) => item !== feature));
    } else {
      onChange([...value, feature]);
    }
  }

  return (
    <fieldset className="mb-6 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md p-5 shadow-sm">
      <legend className="px-2 font-semibold text-sm text-primary">{title}</legend>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {options.map(([label, feature]) => (
          <label key={feature} className="flex items-center gap-2.5 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={value.includes(feature)}
              onChange={() => toggle(feature)}
              className="size-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-foreground">{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function RecommendationsPage() {
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [habits, setHabits] = useState([]);
  const [availableMinutes, setAvailableMinutes] = useState(30);
  const [difficulty, setDifficulty] = useState("any");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitForm(event) {
    event.preventDefault();
    setError("");
    setResults([]);
    setLoading(true);

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interests,
          skills,
          habits,
          available_minutes: Number(availableMinutes),
          preferred_difficulty: difficulty,
          top_n: 5,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.detail || "Gagal mendapatkan rekomendasi.");
      }

      setResults(data.recommendations || []);
      if (!data.recommendations || data.recommendations.length === 0) {
        setError("Belum ada rekomendasi yang cocok. Coba pilih opsi lain atau periksa kembali profilmu.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat meminta rekomendasi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Services</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="border-b border-border/40 pb-6 mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-primary uppercase mb-2">
            <Sparkles size={16} />
            <span>AI Personalization Lab</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Activity Recommendation System <span className="text-primary">.</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Pilih minat, skill, kebiasaan, serta waktu luangmu untuk melihat daftar aktivitas produktif yang paling sesuai dengan profimu.
          </p>
        </div>

        <form onSubmit={submitForm}>
          <MultiSelect title="1. Apa saja minatmu?" options={INTERESTS} value={interests} onChange={setInterests} />
          <MultiSelect title="2. Skill apa yang kamu miliki?" options={SKILLS} value={skills} onChange={setSkills} />
          <MultiSelect title="3. Kebiasaan atau pola aktivitas harianmu?" options={HABITS} value={habits} onChange={setHabits} />

          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="font-semibold text-sm">Waktu Luang Per Aktivitas</span>
              <select
                className="rounded-xl border border-border bg-card/60 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={availableMinutes}
                onChange={(e) => setAvailableMinutes(e.target.value)}
              >
                <option value={15}>15 menit</option>
                <option value={30}>30 menit</option>
                <option value={45}>45 menit</option>
                <option value={60}>60 menit</option>
                <option value={90}>90 menit atau lebih</option>
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-semibold text-sm">Tingkat Kesulitan Aktivitas</span>
              <select
                className="rounded-xl border border-border bg-card/60 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="beginner">Pemula</option>
                <option value="intermediate">Menengah</option>
                <option value="any">Semua tingkat</option>
              </select>
            </label>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full sm:w-auto px-8 py-4 font-semibold shadow-md transition-all"
          >
            {loading ? "Menghitung Rekomendasi..." : "Dapatkan Rekomendasi Aktivitas"}
          </Button>
        </form>

        {error && (
          <div role="alert" className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <section className="mt-14 space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Trophy size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Hasil Rekomendasi untukmu</h2>
                <p className="text-sm text-muted-foreground">Daftar aktivitas pilihan yang diurutkan berdasarkan skor kecocokan tertinggi.</p>
              </div>
            </div>

            <div className="grid gap-5">
              {results.map((item) => (
                <Card 
                  key={item.id} 
                  className="group relative overflow-hidden border border-border/70 bg-card/70 backdrop-blur-md p-6 shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-primary/5 transition-all group-hover:bg-primary/10 -z-10" />

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    
                    {/* Bagian Judul & Deskripsi */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-sm">
                          {item.rank}
                        </span>
                        <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-10">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pl-10 pt-1 text-xs font-medium text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 bg-secondary/80 px-3 py-1.5 rounded-lg border border-border/40 shadow-2xs">
                          <Clock size={14} className="text-primary" />
                          Durasi: <span className="text-foreground font-semibold">{item.duration_minutes} menit</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-secondary/80 px-3 py-1.5 rounded-lg border border-border/40 shadow-2xs">
                          <BarChart2 size={14} className="text-primary" />
                          Tingkat: <span className="text-foreground font-semibold capitalize">{item.difficulty}</span>
                        </span>
                      </div>
                    </div>

                    {/* Badge Skor Kesesuaian (Dipusatkan / Centered secara presisi) */}
                    <div className="flex md:flex-col items-center justify-center border-t md:border-t-0 pt-4 md:pt-0 border-border/40 shrink-0">
                      <div className="flex flex-col items-center justify-center text-center bg-primary/10 border border-primary/20 rounded-2xl px-5 py-3 shadow-xs w-full md:w-32">
                        <span className="text-[11px] font-bold tracking-wider text-primary uppercase">
                          Skor Kesesuaian
                        </span>
                        <span className="text-2xl font-extrabold tracking-tight text-primary mt-0.5">
                          {item.score}<span className="text-xs font-semibold text-muted-foreground">/100</span>
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Kotak Alasan Rekomendasi */}
                  <div className="mt-5 ml-0 md:ml-10 rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs md:text-sm text-foreground/90">
                    <span className="font-semibold text-primary flex items-center gap-1.5 mb-1">
                      💡 Mengapa aktivitas ini cocok untukmu?
                    </span>
                    <p className="leading-relaxed text-muted-foreground">
                      {item.reason}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center pt-4">
              * Skor menunjukkan tingkat kecocokan profil berdasarkan minat, skill, habit, dan waktu luang, bukan probabilitas keberhasilan instan.
            </p>
          </section>
        )}
      </div>
    </section>
  );
}