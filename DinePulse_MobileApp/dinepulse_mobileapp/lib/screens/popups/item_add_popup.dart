import 'package:dinepulse_mobileapp/models/cart_item.dart';
import 'package:flutter/material.dart';

void showItemAddPopup(
    BuildContext context, CartItem item, Function(CartItem) addToCart) {
  bool _isHoveringCancel = false;
  bool _isHoveringAddToCart = false;

  showDialog(
    context: context,
    builder: (context) => StatefulBuilder(
      builder: (context, setState) {
        return Dialog(
          backgroundColor: Colors.transparent,
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
            ),
            padding: EdgeInsets.all(16.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  item.name,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: Color.fromRGBO(203, 79, 41, 1),
                    fontSize: 16,
                    fontFamily: 'Calistoga',
                  ),
                ),
                SizedBox(height: 15),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    IconButton(
                      icon: const Icon(
                        Icons.remove,
                        color: Color.fromRGBO(203, 79, 41, 1),
                      ),
                      onPressed: () {
                        setState(() {
                          if (item.quantity > 1) {
                            item.quantity--;
                          }
                        });
                      },
                    ),
                    Text(
                      item.quantity.toString(),
                      style: const TextStyle(
                        color: Color.fromRGBO(203, 79, 41, 1),
                        fontSize: 14,
                        fontFamily: 'Calistoga',
                      ),
                    ),
                    IconButton(
                      icon: const Icon(
                        Icons.add,
                        color: Color.fromRGBO(203, 79, 41, 1),
                      ),
                      onPressed: () {
                        setState(() {
                          item.quantity++;
                        });
                      },
                    ),
                  ],
                ),
                SizedBox(height: 15),
                Text(
                  'TOTAL : \$${(item.price * item.quantity).toStringAsFixed(2)}',
                  style: const TextStyle(
                    color: Color.fromRGBO(203, 79, 41, 1),
                    fontSize: 13,
                    fontFamily: 'Calistoga',
                  ),
                ),
                SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    MouseRegion(
                      onEnter: (_) {
                        setState(() {
                          _isHoveringCancel = true;
                        });
                      },
                      onExit: (_) {
                        setState(() {
                          _isHoveringCancel = false;
                        });
                      },
                      child: TextButton(
                        style: TextButton.styleFrom(
                          side: BorderSide(
                            color: _isHoveringCancel
                                ? Colors.white
                                : Color.fromRGBO(203, 79, 41, 1),
                          ),
                          backgroundColor: _isHoveringCancel
                              ? Color.fromRGBO(203, 79, 41, 1)
                              : Colors.transparent,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.0),
                          ),
                        ),
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: Text(
                          'CANCEL',
                          style: TextStyle(
                            color: _isHoveringCancel
                                ? Colors.white
                                : Color.fromRGBO(203, 79, 41, 1),
                            fontSize: 12,
                            fontFamily: 'Calistoga',
                          ),
                        ),
                      ),
                    ),
                    MouseRegion(
                      onEnter: (_) {
                        setState(() {
                          _isHoveringAddToCart = true;
                        });
                      },
                      onExit: (_) {
                        setState(() {
                          _isHoveringAddToCart = false;
                        });
                      },
                      child: TextButton(
                        style: TextButton.styleFrom(
                          side: BorderSide(
                            color: Color.fromRGBO(4, 122, 8, 1),
                          ),
                          backgroundColor: _isHoveringAddToCart
                              ? Color.fromRGBO(4, 122, 8, 1)
                              : Colors.transparent,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.0),
                          ),
                        ),
                        onPressed: () {
                          Navigator.pop(context);
                          addToCart(item);
                        },
                        child: Text(
                          'ADD TO CART',
                          style: TextStyle(
                            color: _isHoveringAddToCart
                                ? Colors.white
                                : Color.fromRGBO(4, 122, 8, 1),
                            fontSize: 12,
                            fontFamily: 'Calistoga',
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    ),
  );
}
