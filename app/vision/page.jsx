"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  ScanSearch,
  Sparkles,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  X,
  Boxes,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function VisionPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  function handleFileChange(event) {
    const selected = event.target.files?.[0] || null;

    setError("");
    setResult(null);

    if (!selected) {
      setFile(null);
      return;
    }

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setFile(null);
      setError("Gunakan format gambar JPEG, PNG, atau WebP.");
      event.target.value = "";
      return;
    }

    if (selected.size > MAX_UPLOAD_BYTES) {
      setFile(null);
      setError("Ukuran gambar maksimum adalah 8 MiB.");
      event.target.value = "";
      return;
    }

    setFile(selected);
  }

  async function runDetection() {
    if (!file || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const form = new FormData();
      form.append("image", file);

      const response = await fetch("/api/vision/detect", {
        method: "POST",
        body: form,
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.detail || "Deteksi gagal diproses.");
      }

      if (!Array.isArray(data.detections) || typeof data.count !== "number") {
        throw new Error("Format hasil deteksi dari backend tidak sesuai.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat memproses gambar."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetDetection() {
    if (loading) return;

    setFile(null);
    setResult(null);
    setError("");

    const input = document.getElementById("vision-image");
    if (input) input.value = "";
  }

  return (
    <section className="relative min-h-screen">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        
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
        <div className="border-b border-border/40 pb-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                AI COMPUTER VISION LAB
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                Waste Object Detection 
              </h1>
              <p className="mt-4 text-muted-foreground max-w-2xl">
                Unggah foto sampah untuk dianalisis secara otomatis menggunakan model YOLO. Lihat objek terdeteksi, tingkat keyakinan (confidence), dan titik koordinatnya.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card/60 backdrop-blur-md px-4 py-3 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                YOLO Model Active
              </span>
            </div>
          </div>
        </div>

        {/* Upload and Preview Section */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Upload Panel */}
          <Card className="border border-border/60 bg-card/60 backdrop-blur-md p-6 shadow-lg flex flex-col justify-between h-full">
            <div>
              <div className="mb-6 flex items-start gap-3">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Upload size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Upload Image</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pilih file gambar untuk mulai analisis.
                  </p>
                </div>
              </div>

              <label
                htmlFor="vision-image"
                className="group flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background/60 px-5 py-8 text-center transition hover:border-primary/60 hover:bg-primary/5"
              >
                <div className="mb-4 rounded-2xl border border-border bg-card p-4 transition group-hover:border-primary/30 shadow-sm">
                  <ImageIcon size={30} className="text-primary" />
                </div>

                <span className="font-medium">
                  {file ? "Ganti gambar" : "Klik untuk memilih gambar"}
                </span>
                <span className="mt-2 text-sm text-muted-foreground">
                  atau seret file dari komputer Anda
                </span>
                <span className="mt-4 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground bg-background">
                  JPEG · PNG · WebP · Maks. 8 MiB
                </span>
              </label>

              <input
                id="vision-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={loading}
                className="sr-only"
              />

              {file && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-background/50 p-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <ImageIcon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MiB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetDetection}
                    disabled={loading}
                    aria-label="Hapus gambar"
                    className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {error && (
                <div role="alert" className="mt-4 flex gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-500">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={runDetection}
              disabled={!file || loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 shadow-md"
            >
              {loading ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Sedang menganalisis...
                </>
              ) : (
                <>
                  <ScanSearch size={19} />
                  Deteksi Objek Sekarang
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </Card>

          {/* Preview / Result Panel */}
          <Card className="flex min-h-[360px] flex-col overflow-hidden border border-border/60 bg-card/60 backdrop-blur-md shadow-lg h-full justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
                <div>
                  <h2 className="font-semibold text-base">
                    {result ? "Detection Output" : "Image Preview"}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {result ? "Visualisasi hasil bounding box YOLO" : "Pratinjau gambar asli"}
                  </p>
                </div>

                {result && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <CheckCircle2 size={14} />
                    Selesai
                  </span>
                )}
              </div>

              <div className="flex flex-1 items-center justify-center bg-black/[0.025] p-4 dark:bg-white/[0.015] sm:p-6 relative min-h-[300px]">
                {result?.annotated_image ? (
                  <div className="relative w-full h-[380px]">
                    <Image
                      src={result.annotated_image}
                      alt="Hasil deteksi YOLO dengan bounding box"
                      fill
                      className="rounded-lg object-contain"
                    />
                  </div>
                ) : previewUrl ? (
                  <div className="relative w-full h-[380px]">
                    <Image
                      src={previewUrl}
                      alt="Preview gambar yang akan dianalisis"
                      fill
                      className="rounded-lg object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex max-w-xs flex-col items-center text-center py-12">
                    <div className="mb-4 rounded-2xl border border-border bg-background p-5 shadow-sm">
                      <ScanSearch size={38} className="text-muted-foreground" />
                    </div>
                    <p className="font-medium">Belum ada gambar dipilih</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Silakan unggah gambar melalui panel sebelah kiri untuk melihat hasil deteksi.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-border px-5 py-3 sm:px-6 bg-background/40">
              <p className="truncate text-xs text-muted-foreground">
                {file ? file.name : "Menunggu unggahan gambar..."}
              </p>
            </div>
          </Card>
        </section>

        {/* Detection Summary Section */}
        {result && (
          <section className="mt-10 space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-primary font-medium">
                  <CheckCircle2 size={17} />
                  Analysis Completed Successfully
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Ringkasan Hasil Deteksi</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Statistik prediksi objek dari model AI YOLO pada gambar Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={resetDetection}
                className="w-fit rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted bg-card shadow-sm"
              >
                Analisis Gambar Lain
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border border-border/60 bg-card/60 backdrop-blur-md p-5 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Objek Terdeteksi</span>
                  <Boxes size={19} className="text-primary" />
                </div>
                <p className="text-3xl font-bold tabular-nums">{result.count}</p>
                <p className="mt-2 text-xs text-muted-foreground">Total prediksi bounding box</p>
              </Card>

              <Card className="border border-border/60 bg-card/60 backdrop-blur-md p-5 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Model Digunakan</span>
                  <Sparkles size={19} className="text-primary" />
                </div>
                <p className="break-all text-xl font-bold">{result.model || "YOLO"}</p>
                <p className="mt-2 text-xs text-muted-foreground">Model aktif di backend FastAPI</p>
              </Card>

              <Card className="border border-border/60 bg-card/60 backdrop-blur-md p-5 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Confidence Threshold</span>
                  <ScanSearch size={19} className="text-primary" />
                </div>
                <p className="text-3xl font-bold tabular-nums">
                  {typeof result.confidence_threshold === "number"
                    ? `${(result.confidence_threshold * 100).toFixed(0)}%`
                    : "—"}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Ambang batas minimum keyakinan</p>
              </Card>
            </div>

            {/* Tabel Detail Objek */}
            <Card className="overflow-hidden border border-border/60 bg-card/60 backdrop-blur-md shadow-md">
              <div className="flex flex-col gap-1 border-b border-border px-5 py-4 sm:px-6">
                <h3 className="font-semibold text-lg">Daftar Objek Teridentifikasi</h3>
                <p className="text-sm text-muted-foreground">
                  Rincian label kelas, tingkat keyakinan, serta koordinat bounding box.
                </p>
              </div>

              {result.count === 0 ? (
                <div className="px-6 py-12 text-center">
                  <ScanSearch size={30} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="font-medium text-base">Tidak ada objek terdeteksi</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Coba gunakan gambar lain dengan pencahayaan atau objek yang lebih jelas.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-5 py-4 font-medium">#</th>
                        <th className="px-5 py-4 font-medium">Label Objek</th>
                        <th className="px-5 py-4 font-medium">Confidence Score</th>
                        <th className="px-5 py-4 font-medium">Bounding Box (x1, y1, x2, y2)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {result.detections.map((item, index) => (
                        <tr key={`${item.class_id}-${index}`} className="transition hover:bg-muted/30">
                          <td className="px-5 py-4 text-muted-foreground font-mono">{index + 1}</td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-2 font-medium">
                              <span className="h-2 w-2 rounded-full bg-primary" />
                              {item.label}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex min-w-32 items-center gap-3">
                              <span className="w-16 tabular-nums font-semibold">
                                {(
                                  typeof item.confidence_percent === "number"
                                    ? item.confidence_percent
                                    : item.confidence * 100
                                ).toFixed(2)}%
                              </span>
                              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{
                                    width: `${Math.max(
                                      0,
                                      Math.min(
                                        100,
                                        typeof item.confidence_percent === "number"
                                          ? item.confidence_percent
                                          : item.confidence * 100
                                      )
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                            {item.bbox_xyxy.x1.toFixed(0)}, {item.bbox_xyxy.y1.toFixed(0)},{" "}
                            {item.bbox_xyxy.x2.toFixed(0)}, {item.bbox_xyxy.y2.toFixed(0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </section>
        )}

        <footer className="mt-16 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Computer Vision Lab · Powered by YOLO & FastAPI
          </p>
        </footer>
      </div>
    </section>
  );
}