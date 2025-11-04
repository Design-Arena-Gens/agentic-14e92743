export const metadata = {
  title: "Pamela Research | Sentimentalism & Virtue",
  description: "Scholarly analysis and JSTOR references for Samuel Richardson's Pamela"
};

import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <h1>Sentimentalism and Virtue in Richardson's Pamela</h1>
          <p className="tag">Analyzing the novel as moral and emotional art, across class and gender</p>
        </header>
        <main className="content">{children}</main>
        <footer className="siteFooter">Built for scholarly use. Sources via Crossref + JSTOR.</footer>
      </body>
    </html>
  );
}
