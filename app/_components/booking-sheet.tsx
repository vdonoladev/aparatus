"use client";

import { useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";

interface BookingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    priceInCents: number;
  };
  barbershop: {
    id: string;
    name: string;
    address: string;
    description: string;
    imageUrl: string;
    phones: string[];
  };
}

const BookingSheet = ({
  open,
  onOpenChange,
  service,
  barbershop,
}: BookingSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Gerar horários de 09:00 às 18:00, de meia em meia hora
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return slots;
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTime(null); // Limpar horário ao selecionar nova data
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const formatPrice = (priceInCents: number) => {
    return Math.round(priceInCents / 100).toString();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
    });
  };

  const canConfirm = selectedDate !== null && selectedTime !== null;

  const handleConfirm = () => {
    if (canConfirm) {
      // Por enquanto, apenas fecha o Sheet
      // A funcionalidade de confirmação será implementada depois
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">Fazer Reserva</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-6">
          {/* Calendário */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate ?? undefined}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-md border"
            />
          </div>

          {/* Horários */}
          {selectedDate && (
            <div className="flex flex-col gap-3">
              <h3 className="text-foreground text-sm font-semibold">
                Selecione o horário
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    className="shrink-0 rounded-full"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Informações do Agendamento */}
          {selectedTime && selectedDate && (
            <>
              <Separator />
              <Card className="bg-card border-border flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-foreground text-base font-bold">
                    {service.name}
                  </h4>
                  <p className="text-foreground text-base font-bold">
                    R$ {formatPrice(service.priceInCents)}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Data</span>
                    <span className="text-foreground text-sm font-medium">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Horário
                    </span>
                    <span className="text-foreground text-sm font-medium">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Barbearia
                    </span>
                    <span className="text-foreground text-sm font-medium">
                      {barbershop.name}
                    </span>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        <SheetFooter>
          <Button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="w-full rounded-full"
          >
            Confirmar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;

