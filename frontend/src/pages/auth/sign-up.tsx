import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { useRegisterUser } from '@/api/user/register-user'
import { ContentPage } from '@/components/content-page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string().email(),
  confirmPassword: z.string()
})
type SignUpFormType = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SignUpFormType>()

  const navigate = useNavigate()
  const { mutateAsync: registerUser } = useRegisterUser()

  async function handleSignUp(data: SignUpFormType) {
    try {
      await registerUser({
        email: data.email,
        name: data.name,
        password: data.password
      })
      toast.success('Cadastrado feito com sucesso!.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/`)
        }
      })
    } catch (error) {
      toast.error('Houve um erro ao tentar cadastrar. Tente novamente.')
    }
  }

  return (
    <ContentPage titlePage="Cadastro">
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/">Fazer Login</Link>
        </Button>
        <div className="flex w-[340px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Crie uma conta grátis.
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name"> Seu nome</Label>
              <Input id="name" type="text" {...register('name')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email"> Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"> Senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword"> Repita a senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
              />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com as{' '}
              <a className="underline underline-offset-4" href="">
                Polítcas de Privacidade
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-4" href="">
                Termos de Uso
              </a>
            </p>
          </form>
        </div>
      </div>
    </ContentPage>
  )
}
