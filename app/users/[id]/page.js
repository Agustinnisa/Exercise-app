import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Building,
  Phone,
  Globe,
  MapPin,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Fetch data user dari API internal yang sudah terhubung ke JSONPlaceholder
async function getUser(id) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function UserDetailPage({ params }) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  const initials = user.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <Link href="/users">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="size-4" /> Back to Users
        </Button>
      </Link>

      <Card className="border-border/60 bg-card/60 backdrop-blur-md shadow-xl">
        {/* Header Profil */}
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {initials}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              {user.username && (
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          {/* Kontak Dasar */}
          <div className="grid gap-3 text-sm border-b border-border/40 pb-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>

            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="size-4 text-primary shrink-0" />
              <span>{user.email}</span>
            </div>

            {user.phone && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="size-4 text-primary shrink-0" />
                <span>{user.phone}</span>
              </div>
            )}

            {user.website && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Globe className="size-4 text-primary shrink-0" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-primary"
                >
                  {user.website}
                </a>
              </div>
            )}
          </div>

          {/* Data Alamat (Address) */}
          {user.address && (
            <div className="grid gap-2 text-sm border-b border-border/40 pb-4">
              <h3 className="font-semibold text-foreground">Address</h3>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="size-4 text-primary shrink-0 mt-1" />
                <div>
                  <p>
                    {user.address.street}, {user.address.suite}
                  </p>
                  <p>
                    {user.address.city}, {user.address.zipcode}
                  </p>
                  {user.address.geo && (
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Geo: Lat {user.address.geo.lat}, Lng{" "}
                      {user.address.geo.lng}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Data Perusahaan (Company) */}
          {user.company && (
            <div className="grid gap-2 text-sm">
              <h3 className="font-semibold text-foreground">Company</h3>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Building className="size-4 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">
                    {typeof user.company === "string"
                      ? user.company
                      : user.company.name}
                  </p>
                  {user.company.catchPhrase && (
                    <p className="text-xs italic text-muted-foreground mt-0.5">
                      {`"${user.company.catchPhrase}"`}
                    </p>
                  )}
                  {user.company.bs && (
                    <div className="flex items-center gap-1.5 text-xs text-primary/80 mt-1">
                      <Briefcase className="size-3" />
                      <span>{user.company.bs}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
