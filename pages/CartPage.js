export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }
  async goto() {
    await this.page.goto('/cart.html');
  }
  async getItemNames() {
    return this.itemNames.allTextContents();
  }
  async getItemCount() {
    return this.cartItems.count();
  }
  async removeItem(name) {
    const item = this.page.locator('.cart_item', { hasText: name });
    await item.locator('button').click();
  }
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
