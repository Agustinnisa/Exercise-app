import { NextResponse } from "next/server";
import { saveChatInteraction } from "@/lib/chat-data";

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Mendukung properti message (dari kode lama) atau question (dari payload baru)
    const question = (body.question || body.message)?.trim();
    const sessionId = body.sessionId;
    const consent = body.consent;
    const consentNoticeVersion = body.consentNoticeVersion || "v1";

    // Langkah 5: Validasi Payload di Server
    if (typeof question !== "string" || !question || question.length > 4000) {
      return NextResponse.json(
        { error: "Pertanyaan tidak valid atau terlalu panjang." },
        { status: 400 }
      );
    }

    if (consent !== true) {
      return NextResponse.json(
        { error: "Persetujuan pemrosesan data diperlukan." },
        { status: 400 }
      );
    }

    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (typeof sessionId !== "string" || !uuidPattern.test(sessionId)) {
      return NextResponse.json(
        { error: "ID sesi tidak valid." },
        { status: 400 }
      );
    }

    const baseUrl = process.env.FASTAPI_BASE_URL || "http://127.0.0.1:8000";
    
    // Teruskan ke FastAPI backend (mengirim key "message" sesuai struktur FastAPI RAG lama)
    const upstream = await fetch(`${baseUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
      cache: "no-store",
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json(data, { status: upstream.status });
    }

    // Langkah 6E: Simpan interaksi ke Supabase di latar belakang secara aman
    try {
      await saveChatInteraction({
        sessionId,
        question,
        answer: data.answer || "",
        sources: Array.isArray(data.sources) ? data.sources : [],
        consentNoticeVersion,
      });
    } catch (saveError) {
      // Jika penyimpanan gagal, error dicatat di console server, 
      // tetapi jawaban chatbot ke user TETAP BERHASIL DITAMPILKAN.
      console.error("Chat interaction storage failed:", saveError);
    }

    return NextResponse.json(data, { status: upstream.status });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Layanan chatbot belum dapat dihubungi." },
      { status: 500 }
    );
  }
}