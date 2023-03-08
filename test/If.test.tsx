import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import If from '../src/components/If';

describe('If.tsx', () => {
   it('should render without any errors', () => {
      render(
         <If condition>
            <div data-testid="element">element</div>
         </If>
      );
   });

   it('should return null if condition is falsy', () => {
      render(
         <If condition={false}>
            <div data-testid="element">element</div>
         </If>
      );
      expect(screen.queryByTestId('element')).not.toBeInTheDocument();
   });

   it('should throw error if no children present', () => {
      // @ts-expect-error
      expect(() => render(<If condition={false}></If>)).toThrowError('Please provide children');
   });

   it('should render first children if the condition is true', () => {
      render(
         <If condition>
            <div data-testid="element">element</div>
         </If>
      );
      expect(screen.queryByTestId('element')).toBeInTheDocument();
   });

   it('should render fist children if condition is truthy', () => {
      render(
         <If condition>
            <div data-testid="element">element</div>
            <div data-testid="second-children">second children</div>
         </If>
      );
      expect(screen.queryByTestId('element')).toBeInTheDocument();
      expect(screen.queryByTestId('second-children')).not.toBeInTheDocument();
   });

   it('should render second children if condition is falsy', () => {
      render(
         <If condition={false}>
            <div data-testid="element">element</div>
            <div data-testid="second-children">second children</div>
         </If>
      );
      expect(screen.queryByTestId('element')).not.toBeInTheDocument();
      expect(screen.queryByTestId('second-children')).toBeInTheDocument();
   });

   it('should throw error if more than 2 children is provided', () => {
      expect(() => {
         render(
            <If condition={false}>
               <div data-testid="element">element</div>
               <div data-testid="second-children">second children</div>
               <div data-testid="third-children">third children</div>
            </If>
         );
      }).toThrowError('component takes max two childrens');
   });

   it('should return element in suspense if suspense is true', () => {
      render(
         <If condition={true} suspense>
            <div data-testid="element">mango</div>
         </If>
      );
      expect(screen.queryByTestId('element')).toBeInTheDocument();
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
