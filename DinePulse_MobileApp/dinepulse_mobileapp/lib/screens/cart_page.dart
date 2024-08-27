import 'package:dinepulse_mobileapp/screens/popups/empty_cart_popup.dart';
import 'package:dinepulse_mobileapp/screens/popups/item_remove_popup.dart';
import 'package:dinepulse_mobileapp/services/submit_order.dart';
import 'package:flutter/material.dart';
import '../models/cart_item.dart';
import '../services/cart_service.dart';
import '../widgets/custom_app_bar.dart';
import '../models/global_state.dart' as global_state;

class CartPage extends StatefulWidget {
  @override
  _CartPageState createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  void _removeItem(CartItem item) {
    setState(() {
      cartService.removeItem(item);
    });
  }

  void _updateQuantity(CartItem item, int quantity) {
    setState(() {
      if (quantity > 0) {
        cartService.updateQuantity(item, quantity);
      }
    });
  }

  void _updateCookingInstructions(CartItem item, String instructions) {
    setState(() {
      cartService.updateCookingInstructions(item, instructions);
    });
  }

  void _confirmOrder() async {
    if (cartService.itemCount == 0) {
      showEmptyCartDialog(context);
    } else {
      final orderDetails = cartService.items.map((item) {
        return {
          "itemId": item.id,
          "quantity": item.quantity,
        };
      }).toList();

      final body = {
        "customerId": global_state.selectedTable != null ? 4 : 3,
        "tableId": global_state.selectedTable != null ? 15 : 16,
        "orderTypeId": global_state.selectedTable != null ? 1 : 2,
        "statusId": 1,
        "orderDetails": orderDetails,
      };
      final result = await submitOrder(body);

      if (result == "Order added successfully") {
        setState(() {
          cartService.clearCart();
        });
        Navigator.of(context)
            .pushNamedAndRemoveUntil('/checkout', (route) => false);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(result)),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'CART',
        showProfileIcon: true,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: EdgeInsets.all(16.0),
              itemCount: cartService.items.length,
              itemBuilder: (context, index) {
                final item = cartService.items[index];
                return Card(
                  color: const Color.fromRGBO(255, 244, 226, 1),
                  margin: const EdgeInsets.symmetric(vertical: 8.0),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Image.network(
                              item.imagePath,
                              width: 50,
                              height: 50,
                              fit: BoxFit.cover,
                            ),
                            SizedBox(width: 8.0),
                            Expanded(
                              child: Text(
                                item.name,
                                style: const TextStyle(
                                  color: Color.fromRGBO(203, 79, 41, 1),
                                  fontSize: 15,
                                  fontFamily: 'Calistoga',
                                ),
                              ),
                            ),
                            IconButton(
                              icon: Icon(Icons.delete, color: Colors.red),
                              onPressed: () {
                                showItemRemoveConfirmationDialog(
                                    context, item, _removeItem);
                              },
                            ),
                          ],
                        ),
                        SizedBox(height: 8.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    border: Border.all(
                                        color: Color.fromRGBO(203, 79, 41, 1)),
                                    borderRadius: BorderRadius.circular(5),
                                  ),
                                  child: IconButton(
                                    icon: Icon(Icons.remove),
                                    onPressed: () {
                                      _updateQuantity(item, item.quantity - 1);
                                    },
                                  ),
                                ),
                                SizedBox(width: 8.0),
                                Text(
                                  '${item.quantity} x \$${item.price.toStringAsFixed(2)}',
                                  style: TextStyle(
                                    color: Color.fromRGBO(203, 79, 41, 1),
                                    fontSize: 14,
                                    fontFamily: 'Calistoga',
                                  ),
                                ),
                                SizedBox(width: 8.0),
                                Container(
                                  decoration: BoxDecoration(
                                    border: Border.all(
                                        color: Color.fromRGBO(203, 79, 41, 1)),
                                    borderRadius: BorderRadius.circular(5),
                                  ),
                                  child: IconButton(
                                    icon: Icon(Icons.add),
                                    onPressed: () {
                                      _updateQuantity(item, item.quantity + 1);
                                    },
                                  ),
                                ),
                              ],
                            ),
                            Text(
                              'Total: \$${item.total.toStringAsFixed(2)}',
                              style: TextStyle(
                                color: Color.fromRGBO(203, 79, 41, 1),
                                fontSize: 15,
                                fontFamily: 'Calistoga',
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 8.0),
                        TextField(
                          decoration: InputDecoration(
                            labelText: 'Cooking Instructions',
                            border: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.grey.shade300),
                            ),
                          ),
                          onChanged: (value) {
                            _updateCookingInstructions(item, value);
                          },
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              children: [
                Text(
                  'TOTAL: \$${cartService.totalPrice.toStringAsFixed(2)}',
                  style: TextStyle(
                    color: Color.fromRGBO(203, 79, 41, 1),
                    fontSize: 18,
                    fontFamily: 'Calistoga',
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Container(
                      width: 150,
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/menu',
                              arguments: {'table': 1, 'count': 1});
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.transparent,
                          shadowColor: Colors.transparent,
                          padding: EdgeInsets.zero,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(4.0),
                          ),
                        ),
                        child: Ink(
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [
                                Color.fromRGBO(255, 49, 49, 1),
                                Color.fromRGBO(255, 145, 77, 1),
                              ],
                              begin: Alignment.centerLeft,
                              end: Alignment.centerRight,
                            ),
                            borderRadius: BorderRadius.circular(4.0),
                          ),
                          child: Container(
                            constraints: const BoxConstraints(
                                minWidth: 60.0, minHeight: 36.0),
                            alignment: Alignment.center,
                            child: const Text(
                              'CONTINUE SHOPPING',
                              style: TextStyle(
                                fontSize: 12,
                                fontFamily: 'Calistoga',
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Container(
                      width: 150,
                      child: ElevatedButton(
                        onPressed: _confirmOrder,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.transparent,
                          shadowColor: Colors.transparent,
                          padding: EdgeInsets.zero,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(4.0),
                          ),
                        ),
                        child: Ink(
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [
                                Color.fromRGBO(255, 49, 49, 1),
                                Color.fromRGBO(255, 145, 77, 1),
                              ],
                              begin: Alignment.centerLeft,
                              end: Alignment.centerRight,
                            ),
                            borderRadius: BorderRadius.circular(4.0),
                          ),
                          child: Container(
                            constraints: const BoxConstraints(
                                minWidth: 60.0, minHeight: 36.0),
                            alignment: Alignment.center,
                            child: const Text(
                              'CONFIRM ORDER',
                              style: TextStyle(
                                fontSize: 12,
                                fontFamily: 'Calistoga',
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
