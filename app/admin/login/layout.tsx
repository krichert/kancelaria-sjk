// Layout dla strony logowania - nie wymaga autentykacji
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
