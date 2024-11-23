'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            Error al cargar los datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-neutral-600">
            {error.message || 'Ha ocurrido un error al cargar los detalles de la persona.'}
          </p>
          <Button onClick={reset} variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}