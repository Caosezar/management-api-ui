import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { Label } from "@radix-ui/react-label";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex w-full items-center justify-center mb-2 bg-gray-50 rounded-md border py-2">
            EasyGame
          </CardTitle>
          <CardTitle>Faça login na sua conta</CardTitle>
          <CardDescription>
            Insira seu email abaixo para acessar sua conta
            <br />
            <small className="text-muted-foreground">
              Teste: admin@test.com / 123456
            </small>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Mensagem de erro */}
              {loginMutation.isError && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                  {loginMutation.error?.message || "Erro no login"}
                </div>
              )}

              {/* Mensagem de sucesso */}
              {loginMutation.isSuccess && (
                <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
                  Login realizado com sucesso!
                </div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@test.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loginMutation.isPending}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="123456"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loginMutation.isPending}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Fazendo login..." : "Login"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  Login com Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <a href="#" className="underline underline-offset-4">
                Cadastre-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
