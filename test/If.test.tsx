import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import If from '../src/components/If';
const Dummy = React.lazy(() => import('../src/dummy/Dummy'));

describe('If.tsx', () => {
   it('should render without any errors or crash', () => {
      render(
         <If condition>
            <div data-testid="element">element</div>
         </If>
      );
   });

   it('should return null if condition evaluates to falsy value', () => {
      render(
         <If condition={false}>
            <div data-testid="element">element</div>
         </If>
      );
      expect(screen.queryByTestId('element')).not.toBeInTheDocument();
   });

   it('should render normally if no children is passed', () => {
      render(<If condition={false}></If>);
   });

   it('should render children if the condition ievaluates to truthy vale and only one child is passed', () => {
      render(
         <If condition={true}>
            <div data-testid="element">element</div>
         </If>
      );
      expect(screen.queryByTestId('element')).toBeInTheDocument();
   });

   it('should render fist children if condition evaluates to truthy value and multiple children are passed', () => {
      render(
         <If condition={2 + 2 > 3}>
            <div data-testid="element">element</div>
            <div data-testid="second-children">second children</div>
         </If>
      );
      expect(screen.queryByTestId('element')).toBeInTheDocument();
      expect(screen.queryByTestId('second-children')).not.toBeInTheDocument();
   });

   it('should render second children if condition evaluates to falsy value and multiple children are passed', () => {
      render(
         <If condition={false}>
            <div data-testid="element">element</div>
            <div data-testid="second-children">second children</div>
         </If>
      );
      expect(screen.queryByTestId('element')).not.toBeInTheDocument();
      expect(screen.queryByTestId('second-children')).toBeInTheDocument();
   });

   it('should render all of the children after zero index when condition evaluates to false', () => {
      render(
         <If condition={false}>
            <div data-testid="element">element</div>
            <div data-testid="second-children">second children</div>
            <div data-testid="third-children">third children</div>
         </If>
      );
      expect(screen.getByTestId('second-children')).toBeInTheDocument();
      expect(screen.getByTestId('third-children')).toBeInTheDocument();
   });

   it('should return element in suspense if suspense is true and condition evaluates to truthy value', () => {
      render(
         <If condition={true} suspense>
            <div data-testid="element">mango</div>
         </If>
      );
      expect(screen.queryByTestId('element')).toBeInTheDocument();
   });
   it('should return element in suspense if suspense iffs true and condition evaluates to truthy value', async () => {
      render(
         <If condition={true} suspense fallback={<h1 data-testid="fallback">loading....</h1>}>
            <Dummy />
         </If>
      );
      expect(screen.queryByTestId('fallback')).toBeInTheDocument();
      await waitFor(() => {
         expect(screen.queryByTestId('dummy-1')).toBeInTheDocument();
      });
   });

   it('should return first-children in suspense if suspense is true and children is multiple', () => {
      render(
         <If condition={true} suspense>
            <div data-testid="element">mango</div>
            <div data-testid="second-children">second children</div>
         </If>
      );
      expect(screen.queryByTestId('element')).toBeInTheDocument();
   });
});
