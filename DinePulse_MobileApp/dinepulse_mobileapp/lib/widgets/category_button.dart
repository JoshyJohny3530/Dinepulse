import 'package:flutter/material.dart';

class CategoryButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final double fontSize;
  final Color iconColor;
  final Color backgroundColor;
  final double borderRadius;

  const CategoryButton({
    super.key,
    required this.label,
    required this.icon,
    required this.iconColor,
    required this.fontSize,
    required this.backgroundColor,
    required this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: ElevatedButton(
        onPressed: () {
          //filter
        },
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
          backgroundColor: backgroundColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(borderRadius),
          ),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              size: 20,
              color: iconColor,
            ),
            const SizedBox(width: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: fontSize,
                fontFamily: 'Calistoga',
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
