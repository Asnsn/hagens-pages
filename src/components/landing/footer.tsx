import Link from 'next/link';
import { Youtube, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FFFF00] text-black">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-2xl font-bold">
              <span>Control </span>
              <span className="text-accent">Alt</span>
              <span> Dev</span>
            </div>
            <div className="mt-6">
              <p className="font-bold">Telefone</p>
              <p>(19) 98283-6686</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold">Mídias sociais</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Youtube className="h-5 w-5" />
                  <span>YouTube</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Facebook className="h-5 w-5" />
                  <span>Facebook</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div className="border-t border-black/20 py-4">
        <p className="text-center text-sm">
          © Control Alt Dev {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
