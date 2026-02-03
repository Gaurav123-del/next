export function AuthLayout({ children, heroContent }: any) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:flex items-center justify-center bg-black text-white p-10">
        {heroContent}
      </div>
      <div className="flex items-center justify-center p-10">
        {children}
      </div>
    </div>
  );
}
