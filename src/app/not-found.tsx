import React from 'react';
import Link from 'next/link';
import { Gamepad2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#08090D] text-center">
      <div className="absolute inset-0 bg-radial from-[#E63946]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-md w-full glass-panel p-8 md:p-12 rounded-3xl border border-[#E63946]/40 shadow-[0_0_50px_rgba(230,57,70,0.2)] space-y-6 relative z-10">
        <div className="w-20 h-20 rounded-3xl bg-[#E63946]/15 border border-[#E63946]/40 flex items-center justify-center text-[#E63946] mx-auto shadow-[0_0_20px_rgba(230,57,70,0.3)]">
          <AlertTriangle className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-gradient-red tracking-wider">ERROR 404</span>
          <h1 className="text-2xl font-bold text-white">Signal Lost in Orbit</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page coordinate you are searching for has fallen into deep space isolation or does not exist.
          </p>
        </div>

        <Link href="/" className="inline-block w-full">
          <Button fullWidth size="lg" variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Studio Base
          </Button>
        </Link>
      </div>   
    </div>
  );
}
