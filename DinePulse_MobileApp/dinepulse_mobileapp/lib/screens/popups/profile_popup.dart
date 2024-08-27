import 'package:dinepulse_mobileapp/models/global_state.dart';
import 'package:dinepulse_mobileapp/services/cart_service.dart';
import 'package:flutter/material.dart';

void showProfilePopup(BuildContext context) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text(
        'Do you want to Logout?',
        style: TextStyle(
          color: Color.fromRGBO(203, 79, 41, 1),
          fontSize: 15,
          fontFamily: 'Calistoga',
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context);
            clearSelectedTable();
            cartService.clearCart();
            Navigator.pushReplacementNamed(context, '/login');
          },
          style: TextButton.styleFrom(
            backgroundColor: Colors.transparent,
            side: BorderSide(color: Color.fromRGBO(203, 79, 41, 1), width: 1),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          child: const Text(
            'LOGOUT',
            style: TextStyle(
              color: Color.fromRGBO(203, 79, 41, 1),
              fontSize: 13,
              fontFamily: 'Calistoga',
            ),
          ),
        ),
      ],
    ),
  );
}
