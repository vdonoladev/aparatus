"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  CalendarDaysIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const categories = [
  "Cabelo",
  "Barba",
  "Acabamento",
  "Sombrancelha",
  "Massagem",
  "Hidratação",
];

const Menu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isAuthenticated = Boolean(user);
  const initials = useMemo(() => {
    if (!user?.name) {
      return (user?.email ?? "?").slice(0, 2).toUpperCase();
    }
    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((segment) => segment[0])
      .join("")
      .toUpperCase();
  }, [user]);

  const handleNavigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const handleLogin = async () => {
    setOpen(false);
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    if (!isAuthenticated) {
      return;
    }
    setOpen(false);
    await authClient.signOut();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full max-w-[370px] border-r-0 p-0 sm:w-[370px]"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="px-6 py-6">
            <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
          </SheetHeader>
          {/* <Separator /> */}
          <div className="px-6 py-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                  <AvatarFallback className="text-base font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-foreground text-base font-semibold">
                    {user?.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <span className="text-foreground text-base font-semibold">
                  Olá. Faça seu login!
                </span>
                <Button
                  onClick={handleLogin}
                  className="rounded-full px-6 text-sm font-semibold"
                >
                  Login
                  <LogInIcon className="size-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="space-y-1 px-6">
              <Button
                variant="ghost"
                className="text-foreground h-12 justify-start gap-3 rounded-full px-6 text-sm font-medium"
                onClick={() => handleNavigate("/")}
              >
                <HomeIcon className="size-4" />
                Início
              </Button>
              <Button
                variant="ghost"
                className="text-foreground h-12 justify-start gap-3 rounded-full px-6 text-sm font-medium"
                onClick={() => handleNavigate("/bookings")}
              >
                <CalendarDaysIcon className="size-4" />
                Agendamentos
              </Button>
            </div>
            <div className="px-6 py-4">
              <Separator />
            </div>
            <div className="space-y-2 px-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className="text-foreground h-10 justify-start rounded-full px-6 text-sm font-medium hover:bg-transparent"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="px-6 py-4">
              <Separator />
            </div>
            <div className="px-6 pb-6">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-muted-foreground h-12 justify-start gap-3 rounded-full px-6 text-sm font-medium"
                onClick={handleLogout}
                disabled={!isAuthenticated}
              >
                <LogOutIcon className="size-4" />
                Sair da conta
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
