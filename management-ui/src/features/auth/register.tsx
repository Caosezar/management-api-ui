import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card"

export default function Register() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Criar conta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" placeholder="Seu nome" required />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="exemplo@email.com" required />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="********" required />
            </div>
          </div>
          <CardFooter className="flex justify-center p-0">
            <Button type="submit" className="w-full">
              Registrar
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
