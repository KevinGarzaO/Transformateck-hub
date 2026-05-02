# End-to-End (E2E) Testing Template

## Overview
E2E tests verify complete user workflows from start to finish. They test the entire application stack and simulate real user interactions.

## Guidelines

### Test Structure
```typescript
describe('User Workflow', () => {
  beforeEach(() => {
    // Setup test environment
    cy.visit('/');
    cy.clearCookies();
  });

  it('should complete purchase workflow', () => {
    // Navigate to products
    cy.visit('/products');
    
    // Select product
    cy.get('[data-testid="product-card"]').first().click();
    
    // Add to cart
    cy.get('button:contains("Add to Cart")').click();
    
    // Verify
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });
});
```

### Best Practices

1. **User-Centric**: Test from user perspective, not implementation
2. **Real Browser**: Use actual browser (Chrome, Firefox)
3. **Full Stack**: Test entire application flow
4. **Realistic Data**: Use test data that mirrors production
5. **Wait for Elements**: Use proper waits, not hard sleeps
6. **Isolated Tests**: Each test should be independent
7. **Clean Data**: Reset state between tests

### Cypress Example
```typescript
describe('User Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
    // Clear any existing auth
    cy.clearCookies();
    cy.window().then(win => {
      win.localStorage.clear();
    });
  });

  it('should login and access dashboard', () => {
    // Login
    cy.get('[data-testid="email-input"]')
      .type('user@example.com');
    cy.get('[data-testid="password-input"]')
      .type('password123');
    cy.get('button:contains("Login")').click();

    // Wait for redirect
    cy.url().should('include', '/dashboard');

    // Verify user is logged in
    cy.get('[data-testid="user-welcome"]')
      .should('contain', 'Welcome');
  });

  it('should logout', () => {
    // Login first
    cy.login('user@example.com', 'password123');

    // Click logout
    cy.get('[data-testid="user-menu"]').click();
    cy.get('button:contains("Logout")').click();

    // Verify redirect to login
    cy.url().should('include', '/login');
    cy.get('h1').should('contain', 'Login');
  });

  it('should show error on invalid credentials', () => {
    cy.get('[data-testid="email-input"]')
      .type('user@example.com');
    cy.get('[data-testid="password-input"]')
      .type('wrongpassword');
    cy.get('button:contains("Login")').click();

    // Check error message
    cy.get('[role="alert"]')
      .should('contain', 'Invalid credentials');
  });
});
```

### Shopping Cart E2E Example
```typescript
describe('Complete Shopping Experience', () => {
  it('should browse, add items, and checkout', () => {
    // Home page
    cy.visit('/');
    cy.get('nav').should('be.visible');

    // Browse products
    cy.get('[data-testid="products-link"]').click();
    cy.url().should('include', '/products');
    cy.get('[data-testid="product-item"]')
      .should('have.length.greaterThan', 0);

    // Add items to cart
    cy.get('[data-testid="product-item"]').first().within(() => {
      cy.get('[data-testid="add-btn"]').click();
    });
    cy.get('[data-testid="cart-badge"]').should('contain', '1');

    // View cart
    cy.get('[data-testid="cart-link"]').click();
    cy.url().should('include', '/cart');
    cy.get('[data-testid="cart-item"]').should('have.length', 1);

    // Checkout
    cy.get('button:contains("Proceed to Checkout")').click();
    
    // Fill shipping
    cy.get('[data-testid="address-input"]').type('123 Main St');
    cy.get('[data-testid="continue-btn"]').click();

    // Payment
    cy.get('[data-testid="card-input"]').type('4111111111111111');
    cy.get('[data-testid="pay-btn"]').click();

    // Confirmation
    cy.url().should('include', '/confirmation');
    cy.get('[data-testid="order-number"]').should('exist');
  });
});
```

### Performance Considerations
```typescript
describe('Performance E2E Tests', () => {
  it('should load homepage within acceptable time', () => {
    const start = Date.now();
    cy.visit('/');
    cy.get('[data-testid="main-content"]').should('be.visible');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(3000); // 3 seconds
  });

  it('should handle slow network', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.spy(win.console, 'error');
      },
    });
    // App should still work
    cy.get('[data-testid="search-btn"]').should('be.visible');
  });
});
```

### Accessibility E2E Tests
```typescript
describe('Accessibility E2E', () => {
  it('should be keyboard navigable', () => {
    cy.visit('/');
    
    // Tab through interactive elements
    cy.get('body').tab();
    cy.focused().should('have.attr', 'data-testid');
    
    cy.get('body').tab();
    cy.focused().should('have.attr', 'data-testid');
  });

  it('should have proper ARIA labels', () => {
    cy.visit('/');
    cy.get('button').each(btn => {
      cy.wrap(btn).should('have.attr', 'aria-label')
        .or('have.attr', 'aria-labelledby')
        .or('contain.text', /\w/);
    });
  });
});
```

## Tools & Frameworks
- **Cypress**: Modern browser automation (recommended)
- **Playwright**: Cross-browser testing
- **WebdriverIO**: WebDriver protocol
- **Puppers/Puppeteer**: Headless browser automation

## Best Practices
- Use `data-testid` attributes
- Avoid testing implementation details
- Wait for API responses
- Test critical user paths
- Mock external APIs if needed
- Parallel execution for speed

## Coverage Goals
- Happy path workflows
- Error scenarios
- Edge cases
- Cross-browser compatibility
- Performance baselines
