
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div 
      className={cn("container mx-auto px-4 md:px-8 lg:px-12 xl:px-24 flex flex-col items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
