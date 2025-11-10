import Image from "next/image";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    priceInCents: number;
  };
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toFixed(2).replace(".", ",");
  };

  return (
    <div className="bg-card border-border flex gap-3 rounded-2xl border p-3">
      <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-[10px]">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="object-cover"
          sizes="110px"
        />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between">
        <div className="flex flex-col gap-[4px]">
          <h3 className="text-card-foreground text-sm leading-[1.4] font-bold">
            {service.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-[1.4]">
            {service.description}
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-card-foreground text-sm leading-[1.4] font-bold">
            R$ {formatPrice(service.priceInCents)}
          </p>
          <Button
            variant="default"
            size="sm"
            className="shrink-0 rounded-full px-4 py-2 text-sm leading-[1.4]"
          >
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;

