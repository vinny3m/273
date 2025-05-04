function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomProduct() {
    const products = ['Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Watch'];
    return products[getRandomInt(0, products.length - 1)];
  }
  
  function getRandomCustomerName() {
    const customers = ['John Doe', 'Jane Smith', 'Alice Brown', 'Bob Johnson', 'Charlie White'];
    return customers[getRandomInt(0, customers.length - 1)];
  }
  
  function getRandomOrderStatus() {
    const statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
    return statuses[getRandomInt(0, statuses.length - 1)];
  }
  
  module.exports = { getRandomInt, getRandomCustomerName, getRandomProduct, getRandomOrderStatus };
  