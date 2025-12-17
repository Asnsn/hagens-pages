import Link from 'next/link';
import { Bot, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Hagens. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
