import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:dinepulse_mobileapp/models/cart_item.dart';

Future<List<CartItem>> fetchMenu() async {
  final url = Uri.parse('${dotenv.env['APP_API']}/MobileMenu/GetMenuAll');
  final headers = {"Content-Type": "application/json"};
  final response = await http.get(url, headers: headers);
  if (response.statusCode == 200) {
    final parsed =
        jsonDecode(response.body)['data'].cast<Map<String, dynamic>>();

    return parsed
        .map<CartItem>((json) => CartItem(
              id: json['item_id'] as String,
              name: json['item_name'] as String,
              price: double.parse(json['item_price']),
              imagePath: '${dotenv.env['APP_IMAGE']}/${json['item_image']}',
            ))
        .toList();
  } else {
    throw Exception('Failed to load menu');
  }
}
