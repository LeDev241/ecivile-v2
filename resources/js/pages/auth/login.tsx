import { useEffect, useState } from "react"
import { LoginForm } from "@/components/login-form"
import AppLogo from "@/components/app-logo"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoginPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = "/login-image.jpg"
    img.onload = () => setLoaded(true)
  }, [])

  if (!loaded) {
    // Skeleton Loader
    return (
      <div className="grid min-h-svh lg:grid-cols-2">
        {/* Partie gauche (formulaire en skeleton) */}
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs space-y-4">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Partie droite (image en skeleton) */}
        <div className="relative hidden bg-muted lg:block">
          <Skeleton className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    )
  }

  // ✅ Page complète une fois l'image chargée
  return (
    <div className="grid min-h-svh lg:grid-cols-2 animate-fadeIn">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <AppLogo />
            </div>
            eCivile Gabon
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs shadow-xl rounded-lg">
            <LoginForm className="m-4" />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/login-image.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
