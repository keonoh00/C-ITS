export default function EvaluationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="overflow-y-auto flex w-full">{children}</main>;
}
