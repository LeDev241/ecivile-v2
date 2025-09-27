import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { KeySquare, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from './input-error';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={submit}>
      <Head title="Login" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Connexion</h1>
        <p className="text-sm text-balance text-muted-foreground">Entrer vos identifiants pour vous connecter</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            tabIndex={2}
            autoComplete="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            disabled={processing}
            placeholder="email@example.com"
          />
          <InputError message={errors.email} />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe </Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            tabIndex={3}
            autoComplete="new-password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            disabled={processing}
            placeholder="Password"
          />
          <InputError message={errors.password} />
        </div>
        <Button type="submit" className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600" disabled={processing}>
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Se connecter
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Ou contnuer avec</span>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
            <KeySquare className="h-4 w-4" />
            Mot de passe oublié ?
          </Link>
        </Button>
      </div>
    </form>
  );
}
