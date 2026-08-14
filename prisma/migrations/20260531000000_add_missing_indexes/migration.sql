-- Add missing indexes for query performance

-- Account: userId for NextAuth OAuth lookups
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- Session: userId for NextAuth session lookups
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- Product: isPublished filter, stock range scan, composite category+published
CREATE INDEX "Product_isPublished_idx" ON "Product"("isPublished");
CREATE INDEX "Product_stock_idx" ON "Product"("stock");
CREATE INDEX "Product_isPublished_categoryId_idx" ON "Product"("isPublished", "categoryId");

-- Review: productId for loading all reviews on a product page
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- Order: userId and (userId, createdAt) for user order history
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
CREATE INDEX "Order_userId_createdAt_idx" ON "Order"("userId", "createdAt" DESC);

-- OrderItem: orderId, productId, status
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");
CREATE INDEX "OrderItem_status_idx" ON "OrderItem"("status");

-- Payment: userId and status for payment history and webhook filtering
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- Notification: userId, (userId, createdAt), (userId, isRead)
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt" DESC);
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");
