# Unit Testing Template

## Overview
Unit tests focus on testing individual functions, components, or classes in isolation. They are the fastest and most specific type of tests.

## Guidelines

### Test Structure
```typescript
describe('Feature Name', () => {
  describe('Component/Function Name', () => {
    it('should perform expected behavior', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = myFunction(input);
      
      // Assert
      expect(result).toBe('expected output');
    });
  });
});
```

### Best Practices

1. **Test One Thing**: Each test should verify a single behavior
2. **Clear Names**: Describe what the test does with `describe` and `it` blocks
3. **AAA Pattern**: Arrange, Act, Assert
4. **No Side Effects**: Mock external dependencies
5. **Fast Execution**: Unit tests should run quickly

### Jest Example
```typescript
// Function to test
export function add(a: number, b: number): number {
  return a + b;
}

// Test
describe('Math Functions', () => {
  describe('add', () => {
    it('should return sum of two numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
    });
  });
});
```

### React Component Example
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

### Common Matchers
- `toBe()` - Exact match
- `toEqual()` - Deep equality
- `toContain()` - Array/string contains
- `toBeDefined()` - Defined check
- `toBeNull()` - Null check
- `toThrow()` - Exception check
- `toHaveBeenCalled()` - Mock called
- `toHaveBeenCalledWith()` - Mock called with args

## Coverage Goals
- Aim for 80%+ coverage
- Focus on critical paths
- Test happy path and error cases
