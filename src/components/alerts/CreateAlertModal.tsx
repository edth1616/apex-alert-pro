import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  DollarSign,
  Settings,
  AlertTriangle,
  Info,
} from 'lucide-react';

const alertSchema = z.object({
  pair: z.string().min(1, 'Debe seleccionar un par de trading'),
  type: z.enum(['LONG', 'SHORT'], {
    required_error: 'Debe seleccionar el tipo de posición',
  }),
  targetPrice: z
    .string()
    .min(1, 'El precio objetivo es obligatorio')
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      'El precio debe ser un número válido mayor a 0'
    ),
  condition: z.string().min(1, 'Debe seleccionar una condición'),
  priority: z.enum(['alta', 'media', 'baja']).default('media'),
  notes: z.string().optional(),
});

type AlertFormData = z.infer<typeof alertSchema>;

interface CreateAlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const cryptoPairs = [
  { 
    symbol: 'BTCUSDT', 
    name: 'Bitcoin',
    icon: '₿',
    currentPrice: 43250.75,
    change: '+2.34%'
  },
  { 
    symbol: 'ETHUSDT', 
    name: 'Ethereum',
    icon: 'Ξ',
    currentPrice: 2678.90,
    change: '+1.82%'
  },
  { 
    symbol: 'SOLUSDT', 
    name: 'Solana',
    icon: '◎',
    currentPrice: 98.45,
    change: '-0.75%'
  },
  { 
    symbol: 'ADAUSDT', 
    name: 'Cardano',
    icon: '₳',
    currentPrice: 0.4872,
    change: '+3.21%'
  },
];

const conditions = [
  { value: 'gte', label: 'Mayor o igual a (≥)' },
  { value: 'lte', label: 'Menor o igual a (≤)' },
  { value: 'cross_up', label: 'Cruza hacia arriba ↗' },
  { value: 'cross_down', label: 'Cruza hacia abajo ↘' },
];

const priorities = [
  { value: 'alta', label: 'Alta', color: 'destructive' },
  { value: 'media', label: 'Media', color: 'secondary' },
  { value: 'baja', label: 'default', color: 'outline' },
];

export function CreateAlertModal({ open, onOpenChange }: CreateAlertModalProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<AlertFormData>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      pair: '',
      type: 'LONG',
      targetPrice: '',
      condition: 'gte',
      priority: 'media',
      notes: '',
    },
  });

  const selectedPair = form.watch('pair');
  const targetPrice = form.watch('targetPrice');
  const currentPair = cryptoPairs.find(pair => pair.symbol === selectedPair);

  const calculatePercentageDiff = () => {
    if (!currentPair || !targetPrice) return null;
    const target = parseFloat(targetPrice);
    const current = currentPair.currentPrice;
    const diff = ((target - current) / current) * 100;
    return diff;
  };

  const onSubmit = async (data: AlertFormData) => {
    setIsLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Nueva alerta:', {
        ...data,
        targetPrice: parseFloat(data.targetPrice),
        createdAt: new Date().toISOString(),
      });

      toast({
        title: '¡Alerta creada exitosamente!',
        description: `Alerta ${data.type} para ${data.pair} en $${data.targetPrice}`,
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error al crear la alerta',
        description: 'Por favor intenta nuevamente',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillCurrentPrice = () => {
    if (currentPair) {
      form.setValue('targetPrice', currentPair.currentPrice.toString());
    }
  };

  const percentageDiff = calculatePercentageDiff();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-primary" />
            </div>
            Nueva Alerta de Trading
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Selector de Par */}
            <FormField
              control={form.control}
              name="pair"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 font-medium">
                    Par de Trading <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar par de trading" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cryptoPairs.map((pair) => (
                        <SelectItem key={pair.symbol} value={pair.symbol}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-primary">
                                {pair.icon}
                              </span>
                              <div>
                                <div className="font-medium">{pair.symbol}</div>
                                <div className="text-xs text-muted-foreground">
                                  {pair.name}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                ${pair.currentPrice.toLocaleString('es-ES', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 8,
                                })}
                              </div>
                              <div className={`text-xs ${
                                pair.change.startsWith('+') 
                                  ? 'text-bull' 
                                  : 'text-bear'
                              }`}>
                                {pair.change}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de Posición */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 font-medium">
                    Tipo de Posición <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="LONG" id="long" />
                        <label
                          htmlFor="long"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Badge 
                            variant="secondary" 
                            className="bg-bull/10 text-bull border-bull/20 hover:bg-bull/20"
                          >
                            <TrendingUp className="w-3 h-3 mr-1" />
                            LONG
                          </Badge>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="SHORT" id="short" />
                        <label
                          htmlFor="short"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Badge 
                            variant="secondary" 
                            className="bg-bear/10 text-bear border-bear/20 hover:bg-bear/20"
                          >
                            <TrendingDown className="w-3 h-3 mr-1" />
                            SHORT
                          </Badge>
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Precio Objetivo */}
            <FormField
              control={form.control}
              name="targetPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 font-medium">
                    Precio Objetivo <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="space-y-2">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="any"
                          placeholder="0.00"
                          className="pl-9"
                        />
                      </FormControl>
                      {currentPair && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={fillCurrentPrice}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-2 text-xs"
                        >
                          Precio actual
                        </Button>
                      )}
                    </div>
                    
                    {/* Preview del porcentaje */}
                    {percentageDiff !== null && currentPair && (
                      <div className="flex items-center gap-2 text-sm">
                        <Info className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Diferencia vs precio actual:
                        </span>
                        <span className={`font-medium ${
                          percentageDiff >= 0 ? 'text-bull' : 'text-bear'
                        }`}>
                          {percentageDiff >= 0 ? '+' : ''}{percentageDiff.toFixed(2)}%
                        </span>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Condición */}
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Condición de Activación</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Configuración Avanzada */}
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex items-center gap-2 p-0 h-auto font-medium text-primary hover:text-primary/80"
                >
                  <Settings className="w-4 h-4" />
                  Configuración Avanzada
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    isAdvancedOpen ? 'rotate-180' : ''
                  }`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Prioridad</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={priority.color as any}
                                  className="text-xs"
                                >
                                  {priority.label}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* Notas */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Notas (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ej: Ruptura de resistencia esperada en zona de 45k..."
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preview de la Alerta */}
            {selectedPair && targetPrice && (
              <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                <h4 className="font-medium text-sm mb-2 text-muted-foreground">
                  Vista Previa de la Alerta:
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Par:</span>
                    <span className="font-medium">{selectedPair}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tipo:</span>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        form.watch('type') === 'LONG' 
                          ? 'bg-bull/10 text-bull border-bull/20' 
                          : 'bg-bear/10 text-bear border-bear/20'
                      }`}
                    >
                      {form.watch('type')}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Precio objetivo:</span>
                    <span className="font-medium">
                      ${parseFloat(targetPrice || '0').toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 8,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary/90 hover:to-primary-dark/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creando...
                  </div>
                ) : (
                  'Crear Alerta'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}