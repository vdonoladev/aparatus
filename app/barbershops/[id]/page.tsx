import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import { Separator } from "@/app/_components/ui/separator";
import { ChevronLeft, Smartphone } from "lucide-react";
import CopyPhoneButton from "@/app/_components/copy-phone-button";
import ServiceItem from "@/app/_components/service-item";
import { PageSectionTitle } from "@/app/_components/ui/page";

interface BarbershopPageProps {
  params: Promise<{ id: string }>;
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params;

  // @ts-expect-error - Prisma client has barbershop property, TypeScript types may be out of sync
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Header with Banner and Back Button */}
      <div className="relative h-[297px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute top-6 left-5 z-10">
          <Link href="/">
            <Button
              variant="secondary"
              size="icon"
              className="bg-background h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="bg-background flex flex-1 flex-col rounded-t-[24px]">
        {/* Barbershop Info Section */}
        <div className="flex items-center gap-[5px] px-5 pt-6">
          <Avatar className="h-[30px] w-[30px] shrink-0">
            <AvatarImage src={barbershop.imageUrl} alt={barbershop.name} />
            <AvatarFallback>{barbershop.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-[4px]">
            <h1 className="text-foreground text-xl leading-normal font-bold">
              {barbershop.name}
            </h1>
            <p className="text-muted-foreground text-sm leading-[1.4]">
              {barbershop.address}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="py-6">
          <Separator />
        </div>

        {/* About Section */}
        <div className="flex flex-col gap-3 px-5">
          <PageSectionTitle>SOBRE NÓS</PageSectionTitle>
          <p className="text-foreground text-sm leading-[1.4] whitespace-pre-wrap">
            {barbershop.description}
          </p>
        </div>

        {/* Divider */}
        <div className="py-6">
          <Separator />
        </div>

        {/* Services Section */}
        <div className="flex flex-col gap-3 px-5">
          <PageSectionTitle>SERVIÇOS</PageSectionTitle>
          <div className="flex flex-col gap-3">
            {barbershop.services.map(
              (service: {
                id: string;
                name: string;
                description: string;
                imageUrl: string;
                priceInCents: number;
              }) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  barbershop={{
                    id: barbershop.id,
                    name: barbershop.name,
                    address: barbershop.address,
                    description: barbershop.description,
                    imageUrl: barbershop.imageUrl,
                    phones: barbershop.phones,
                  }}
                />
              ),
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="py-6">
          <Separator />
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-3 px-5">
          <PageSectionTitle>CONTATO</PageSectionTitle>
          <div className="flex flex-col gap-3">
            {barbershop.phones.map((phone: string, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="text-foreground h-6 w-6" />
                  <p className="text-foreground text-sm leading-[1.4]">
                    {phone}
                  </p>
                </div>
                <CopyPhoneButton phone={phone} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Spacing */}
        <div className="flex flex-col items-center gap-[10px] pt-[60px]">
          <div className="bg-secondary flex w-full flex-col items-start justify-center gap-[6px] overflow-clip px-[30px] py-8 text-xs leading-none">
            <p className="text-foreground text-xs font-semibold">
              © 2025 Copyright Aparatus
            </p>
            <p className="text-muted-foreground text-xs font-normal">
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;
