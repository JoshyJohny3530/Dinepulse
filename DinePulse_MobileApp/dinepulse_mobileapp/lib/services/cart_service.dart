import '../models/cart_item.dart';

class CartService {
  final List<CartItem> _items = [];

  List<CartItem> get items => List.unmodifiable(_items);

  int get itemCount => _items.length;

  double get totalPrice =>
      _items.fold(0.0, (total, item) => total + item.total);

  void addItem(CartItem item) {
    _items.add(item);
  }

  void removeItem(CartItem item) {
    _items.remove(item);
  }

  void updateQuantity(CartItem item, int quantity) {
    final index = _items.indexOf(item);
    if (index != -1) {
      _items[index].quantity = quantity;
    }
  }

  void updateCookingInstructions(CartItem item, String instructions) {
    final index = _items.indexOf(item);
    if (index != -1) {
      _items[index] = CartItem(
        id: _items[index].id,
        name: _items[index].name,
        price: _items[index].price,
        imagePath: _items[index].imagePath,
        quantity: _items[index].quantity,
        cookingInstructions: instructions,
      );
    }
  }

  void clearCart() {
    _items.clear();
  }
}

final cartService = CartService();
