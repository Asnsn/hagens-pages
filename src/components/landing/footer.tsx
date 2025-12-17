import Link from 'next/link';
import { Youtube, Instagram, Linkedin, Facebook } from 'lucide-react';
import { HagensLogoFooter } from './hagens-logo-footer';
import { PartnerLogos } from './partner-logos';

export default function Footer() {
  return (
    <footer className="bg-[#FFFF00] text-black">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <HagensLogoFooter className="h-auto w-48" />
            <div className="mt-8">
              <p className="font-bold">Campinas – SP</p>
              <p>Av. José de Sousa Campos, 575</p>
              <p>Sl. 504/505 – Cambuí</p>
              <p>CEP 13025-320</p>
            </div>
            <div className="mt-6">
              <p className="font-bold">Telefone</p>
              <p>(19) 99832-0494</p>
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

          <div className="md:col-span-6">
            <PartnerLogos />
          </div>
        </div>
      </div>
      <div className="border-t border-black/20 py-4">
        <p className="text-center text-sm">
          © HAGENS {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
