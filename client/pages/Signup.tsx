import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight">Sign up</h1>
        <p className="mt-2 text-muted-foreground">
          This page is a placeholder. Tell me what fields and flow you want, and I’ll build it next.
        </p>
        <div className="mt-8 grid gap-3">
          <Button asChild className="h-11 rounded-full">
            <Link to="/">Back to sign in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
