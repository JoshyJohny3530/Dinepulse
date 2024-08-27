import 'package:dinepulse_mobileapp/models/global_state.dart';
import 'package:flutter/material.dart';

void showCustomerCountPopup(BuildContext context, int tableIndex) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text(
        'Select customer count',
        style: TextStyle(
          color: Color.fromRGBO(203, 79, 41, 1),
          fontSize: 15,
          fontFamily: 'Calistoga',
        ),
      ),
      content: Container(
        width: 200,
        height: 40,
        child: DropdownButtonFormField<int>(
          decoration: InputDecoration(
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(
                color: Color.fromRGBO(203, 79, 41, 1),
                width: 1.0,
              ),
              borderRadius: BorderRadius.circular(8.0),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: BorderSide(
                color: Color.fromRGBO(203, 79, 41, 1),
                width: 1.0,
              ),
              borderRadius: BorderRadius.circular(8.0),
            ),
          ),
          value: 1,
          items: List.generate(
              15,
              (i) => DropdownMenuItem(
                    value: i + 1,
                    child: Text(
                      '${i + 1}',
                      style: TextStyle(
                        fontSize: 16,
                        color: Color.fromRGBO(203, 79, 41, 1),
                        fontFamily: 'Calistoga',
                      ),
                    ),
                  )),
          onChanged: (value) {
            setSelectedTable(tableIndex + 1, value!);
            Navigator.pop(context);
            Navigator.pushNamed(context, '/menu');
          },
        ),
      ),
    ),
  );
}
