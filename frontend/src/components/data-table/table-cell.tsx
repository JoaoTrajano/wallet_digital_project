import { forwardRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TableCellProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
  ({ children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-4 py-3 text-sm text-gray-700', className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TableCell.displayName = 'TableCell';
