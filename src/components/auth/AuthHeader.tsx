interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="p-6 text-center border-b bg-brand-primary/5 border-border-base">
      <h1 className="text-xl font-bold text-text-main font-heading">{title}</h1>
      <p className="mt-1 text-xs text-text-muted">{subtitle}</p>
    </div>
  );
};