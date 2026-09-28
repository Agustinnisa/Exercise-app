export async function GET() {
    const profile = {
        name: "Tria Agusti Khoirun Nisa",
        role: "Peserta Bootcamp",
        favoriteTech: ["React", "HTML", "CSS", "Next.js"]
    };
    return new Response(JSON.stringify(profile, null, 2), {
        headers: { "Content-Type": "application/json" }
    });
}