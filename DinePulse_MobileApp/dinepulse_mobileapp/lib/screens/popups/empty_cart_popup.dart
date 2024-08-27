import 'package:flutter/material.dart';

void showEmptyCartDialog(BuildContext context) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text('Empty Cart'),
      content: const Text('There are no items in the cart.'),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context);
          },
          style: TextButton.styleFrom(
            backgroundColor: Colors.transparent,
            side: BorderSide(color: Color.fromRGBO(4, 122, 8, 1), width: 1),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          child: const Text(
            'OK',
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
