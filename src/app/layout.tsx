import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TeXForge CV — LaTeX CV Creator & Updater',
  description: 'Create and update publication-grade LaTeX resumes in seconds with zero manual code editing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}

