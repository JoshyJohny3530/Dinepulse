import 'package:dinepulse_mobileapp/models/cart_item.dart';
import 'package:flutter/material.dart';

void showItemRemoveConfirmationDialog(
    BuildContext context, CartItem item, Function(CartItem) removeItem) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text('Remove Item'),
      content: const Text(
          'Are you sure you want to remove this item from the cart?'),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context);
          },
          style: TextButton.styleFrom(
            backgroundColor: Colors.transparent,
            side: BorderSide(color: Color.fromRGBO(203, 79, 41, 1), width: 1),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          child: const Text(
            'No',
            style: TextStyle(
              color: Color.fromRGBO(203, 79, 41, 1),
              fontFamily: 'Calistoga',
              fontSize: 12,
            ),
          ),
        ),
        TextButton(
          onPressed: () {
            Navigator.pop(context);
            removeItem(item);
          },
          style: TextButton.styleFrom(
            backgroundColor: Colors.transparent,
            side: BorderSide(color: Color.fromRGBO(4, 122, 8, 1), width: 1),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          child: const Text(
            'Yes',
            style: TextStyle(
              color: Color.fromRGBO(4, 122, 8, 1),
              fontFamily: 'Calistoga',
              fontSize: 12,
            ),
          ),
        ),
      ],
    ),
  );
}
