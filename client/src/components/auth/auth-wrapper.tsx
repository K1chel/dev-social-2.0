export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-secondary/60 w-full px-8 py-10 rounded-md">
      {children}
    </div>
  );
};
