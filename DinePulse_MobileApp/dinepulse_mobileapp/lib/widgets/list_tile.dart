import 'package:flutter/material.dart';

class MyListTile extends StatelessWidget {
  final String text;
  final IconData icon;
  final void Function()? onTap;

  const MyListTile({
    super.key,
    required this.text,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 15.0),
      child: ListTile(
        leading: Icon(
          icon,
          color: Color.fromRGBO(203, 79, 41, 1),
        ),
        title: Text(
          text,
          style: TextStyle(
            fontSize: 15,
            color: Color.fromRGBO(203, 79, 41, 1),
            fontFamily: 'Calistoga',
          ),
        ),
        onTap: onTap,
      ),
    );
  }
}
