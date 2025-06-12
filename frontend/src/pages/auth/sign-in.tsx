import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { ContentPage } from '@/components/content-page'
import { FormMessage } from '@/components/form-message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'

const signInFormSchema = z.object({
  email: z.string().email('Preencha o campo e-mail corretamente.'),
  password: z.string().min(1, 'Forneceça a senha.')
})
type SignInFormType = z.infer<typeof signInFormSchema>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: ''
    }
  })

  const { signIn } = useAuth()

  async function handleSignIn(data: SignInFormType) {
    await signIn({ email: data.email, password: data.password }, () => {
      navigate('/home')
    })
  }

  return (
    <ContentPage titlePage="Login">
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo cadastro</Link>
        </Button>

        <div className="flex w-[340px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar Carteira Digital
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <FormMessage message={errors.email.message} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <FormMessage message={errors.password.message} />
              )}
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar Carteira Digital
            </Button>
          </form>
        </div>
      </div>
    </ContentPage>
  )
}
