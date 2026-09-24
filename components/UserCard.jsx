import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  return (
        <Card className="border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
                <CardTitle className="text-stone-900">
                {user.name}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-stone-600">
                {user.email}
                </p>

                <p className="mt-1 text-sm text-stone-500">
                {user.company.name}
                </p>

                <Button className="mt-4 bg-stone-900 text-white hover:bg-stone-700">
                View Profile
                </Button>
            </CardContent>
        </Card>
    );
}