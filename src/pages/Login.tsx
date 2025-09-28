import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, TrendingUp, Shield, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bienvenido a CryptoAlert Pro",
        description: "Inicio de sesión exitoso",
      });
      // Aquí iría la redirección al dashboard
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Panel Izquierdo - Información */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-text-primary">CryptoAlert Pro</h1>
            </div>
            
            <h2 className="text-4xl font-bold text-text-primary leading-tight mb-4">
              Gestiona tus alertas de trading como un profesional
            </h2>
            
            <p className="text-lg text-text-secondary mb-8">
              Monitorea el mercado, configura alertas inteligentes y toma decisiones informadas con nuestra plataforma avanzada de trading.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-bull/20 to-bull/10 rounded-lg">
                <Bell className="w-6 h-6 text-bull" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Alertas Inteligentes</h3>
                <p className="text-text-secondary">Recibe notificaciones precisas cuando el mercado alcance tus targets.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-info/20 to-info/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-info" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Análisis Avanzado</h3>
                <p className="text-text-secondary">Gráficos profesionales y métricas detalladas para optimizar tu trading.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Seguridad Total</h3>
                <p className="text-text-secondary">Tus datos y configuraciones protegidos con encriptación de nivel bancario.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho - Formulario de Login */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md p-8 shadow-card-hover">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4 lg:hidden">
                <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Iniciar Sesión</h2>
              <p className="text-text-secondary">Accede a tu cuenta de CryptoAlert Pro</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-text-primary">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-text-primary">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">Recordarme</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Regístrate gratis
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-center text-text-muted">
                Al iniciar sesión, aceptas nuestros{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Términos de Servicio
                </Link>{" "}
                y{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;