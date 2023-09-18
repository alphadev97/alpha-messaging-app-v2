import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Threads97",
  description: "A Next.js 13 Meta Threads Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider></ClerkProvider>;
}
