from google import genai
from .config import GEMINI_API_KEY, GEMINI_MODEL

def generate_answer(question: str, contexts: list[dict]) -> str:
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY belum diatur di backend/.env")
    
    client = genai.Client(api_key=GEMINI_API_KEY)
    
    # Menyusun konteks dari hasil ekstraksi PDF dokumen resmi
    context_text = "\n\n".join(
        f"Sumber Dokumen: {item['source']}\n{item['text']}" for item in contexts
    )
    if not context_text:
        context_text = "Tidak ada konteks dokumen resmi yang ditemukan."
    
    # Prompt khusus yang disesuaikan dengan dokumen regulasi & safe space
    prompt = f"""Kamu adalah asisten AI pendukung untuk "Virtual Safe Space", sebuah platform informasi awal seputar kesehatan mental, perlindungan, dan regulasi hak perempuan serta anak di Indonesia. 
Jawablah pertanyaan pengguna menggunakan bahasa Indonesia yang empatik, profesional, menenangkan, dan mudah dipahami.

ATURAN UTAMA:
1. Jadikan KONTEN DOKUMEN di bawah sebagai sumber referensi utama.
2. Jangan mengarang pasal hukum, nomor telepon darurat, atau informasi yang tidak didukung oleh dokumen. Jika dokumen tidak memuat informasi yang spesifik, katakan dengan jujur bahwa informasi tersebut belum tersedia di dalam dokumen referensi.
3. Berikan jawaban yang terstruktur (gunakan poin-poin jika diperlukan agar mudah dibaca).
4. Jangan pernah mengklaim diri sebagai psikolog profesional, tenaga medis, atau layanan darurat resmi. Ingatkan pengguna untuk mencari bantuan profesional atau lembaga berwenang jika membutuhkan penanganan lebih lanjut.

KONTEN DOKUMEN REFERENSI:
{context_text}

PERTANYAAN PENGGUNA:
{question}
"""

    models_to_try = [
        GEMINI_MODEL,
        "gemini-3.8-flash",
        "gemini-3.7-flash",
        "gemini-3.6-flash",
        "gemini-3.5-flash",
    ]
    
    # Menghilangkan duplikat model dengan tetap mempertahankan urutan prioritas
    models_to_try = list(dict.fromkeys([m for m in models_to_try if m]))

    last_exception = None
    
    # Perulangan otomatis untuk mencoba model berikutnya jika terjadi error/high demand (503)
    for model_name in models_to_try:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
            )
            if response and response.text:
                return response.text
        except Exception as e:
            last_exception = e
            print(f"⚠️ Model '{model_name}' mengalami gangguan/high demand. Mengalihkan ke model cadangan...")
            continue  # Berpindah ke model berikutnya dalam daftar

    # Jika seluruh model dalam daftar tidak dapat dihubungi
    raise RuntimeError(
        f"Seluruh model Gemini sedang mengalami kendala/High Demand (503). Silakan coba lagi beberapa saat. Detail: {str(last_exception)}"
    )