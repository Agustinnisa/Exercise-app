import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group relative overflow-hidden border border-white/10 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3.5">
          {/* Avatar Inisial */}
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/30 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {initials}
          </div>

          <CardTitle className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {user.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground truncate">
          {user.email}
        </p>

        <p className="mt-1 text-xs font-medium text-primary/80">
          {user.company.name}
        </p>

        <Button className="mt-5 w-full rounded-full font-semibold shadow-sm transition-all hover:shadow-md hover:shadow-primary/20">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}