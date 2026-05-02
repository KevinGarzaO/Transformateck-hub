# Integration Testing Template

## Overview
Integration tests verify that multiple components or modules work together correctly. They test the interactions between different parts of your application.

## Guidelines

### Test Structure
```typescript
describe('Feature Integration', () => {
  let module1: Module1;
  let module2: Module2;

  beforeEach(() => {
    // Setup shared dependencies
    module1 = new Module1();
    module2 = new Module2(module1);
  });

  it('should handle data flow between modules', () => {
    // Arrange
    const input = setupTestData();
    
    // Act
    const result = module2.process(input);
    
    // Assert
    expect(result).toMatchExpectedOutput();
  });
});
```

### Best Practices

1. **Test Interactions**: Focus on how modules communicate
2. **Use Real Dependencies**: Minimize mocking, use real implementations
3. **Setup/Teardown**: Use beforeEach/afterEach for consistent state
4. **Realistic Scenarios**: Test actual workflows users perform
5. **Database/API**: Use test databases or mock servers

### API Integration Example
```typescript
import request from 'supertest';
import app from '@/app';

describe('Shopping Cart API Integration', () => {
  describe('POST /api/cart', () => {
    it('should create cart and add items', async () => {
      // Create cart
      const cartResponse = await request(app)
        .post('/api/cart')
        .send({ userId: 123 });
      
      expect(cartResponse.status).toBe(201);
      const cartId = cartResponse.body.id;

      // Add item
      const itemResponse = await request(app)
        .post(`/api/cart/${cartId}/items`)
        .send({ productId: 'prod-1', quantity: 2 });
      
      expect(itemResponse.status).toBe(200);
      expect(itemResponse.body.items).toHaveLength(1);
    });

    it('should calculate total with multiple items', async () => {
      // Setup: Create cart with items
      const cart = await createTestCart();
      await addItemToCart(cart.id, 'prod-1', 2, 10); // $20
      await addItemToCart(cart.id, 'prod-2', 1, 5);  // $5
      
      // Act & Assert
      const response = await request(app).get(`/api/cart/${cart.id}`);
      expect(response.body.total).toBe(25);
    });
  });
});
```

### Database Integration Example
```typescript
describe('User Service Integration', () => {
  beforeEach(async () => {
    await db.clear('users');
  });

  it('should create user and retrieve it', async () => {
    // Arrange
    const userData = { name: 'John', email: 'john@example.com' };
    
    // Act
    const user = await userService.create(userData);
    const retrieved = await userService.getById(user.id);
    
    // Assert
    expect(retrieved).toEqual(expect.objectContaining(userData));
  });

  it('should handle concurrent user creation', async () => {
    const promises = Array(10)
      .fill(null)
      .map((_, i) => userService.create({ name: `User${i}` }));
    
    const users = await Promise.all(promises);
    expect(users).toHaveLength(10);
    expect(new Set(users.map(u => u.id)).size).toBe(10);
  });
});
```

### React Component Integration Example
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShoppingCart } from './ShoppingCart';
import { ProductProvider } from '@/context/ProductContext';
import { CartProvider } from '@/context/CartContext';

describe('Shopping Cart Integration', () => {
  it('should add product and update cart', async () => {
    render(
      <ProductProvider>
        <CartProvider>
          <ShoppingCart />
        </CartProvider>
      </ProductProvider>
    );

    // Find and click add button
    const addButton = screen.getByRole('button', { name: /add to cart/ });
    await userEvent.click(addButton);

    // Wait for cart to update
    await waitFor(() => {
      expect(screen.getByText(/1 item in cart/)).toBeInTheDocument();
    });
  });
});
```

## Common Tools
- **API Testing**: Supertest, Axios
- **Database**: Test databases, Factories, Seeders
- **State Management**: Real Redux/Context setups
- **Wait Utilities**: waitFor(), findBy queries

## Coverage Goals
- Test key workflows
- Verify module boundaries
- Test error scenarios
- Ensure data consistency
