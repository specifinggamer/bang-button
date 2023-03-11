import * as React from 'react';

export default function If({
   condition = false,
   children = null,
   suspense,
   fallback = <></>,
}: {
   condition?: any;
   children?: React.ReactNode;
   suspense?: boolean;
   fallback?: React.ReactNode;
}): JSX.Element | null {
   const conditionNegation = !!condition;
   const isArray = Array.isArray(children);

   if (isArray) {
      // if false then return children present after the array[0] index
      if (!conditionNegation) return <>{children.slice(1)}</>;

      if (conditionNegation && suspense) return <React.Suspense fallback={fallback}>{children[0]}</React.Suspense>;
      if (conditionNegation) return <>{children[0]}</>;
   }
   if (conditionNegation && suspense) return <React.Suspense fallback={fallback}>{children}</React.Suspense>;
   if (conditionNegation) return <>{children}</>;

   return null;
}
