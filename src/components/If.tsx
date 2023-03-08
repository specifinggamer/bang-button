import * as React from 'react';

export default function If({
   condition,
   children,
   suspense,
}: {
   condition: boolean;
   children: React.ReactNode;
   suspense?: boolean;
}): JSX.Element | null {
   if (!children) throw Error('Please provide children');
   const conditionNegation = !!condition;
   const isArray = Array.isArray(children);

   if (isArray) {
      if (children.length > 2) throw Error('component takes max two childrens');
      if (!conditionNegation) return <>{children[1]}</>;
      if (conditionNegation && suspense) return <React.Suspense fallback={<></>}>{children[0]}</React.Suspense>;
      if (conditionNegation) return <>{children[0]}</>;
   }
   if (conditionNegation && suspense) return <React.Suspense fallback={<></>}>{children}</React.Suspense>;
   if (conditionNegation) return <>{children}</>;

   return null;
}
