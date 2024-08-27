import 'dart:convert'; // Import for JSON encoding
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

Future<String> submitOrder(Map<String, dynamic> body) async {
  final url = Uri.parse('${dotenv.env['APP_API']}/MobileOrder/CreateOrder');
  final headers = {"Content-Type": "application/json"};

  try {
    final response = await http.post(
      url,
      headers: headers,
      body: json.encode(body),
    );

    if (response.statusCode == 200) {
      final responseMessage = response.body;

      if (responseMessage == "Order added successfully") {
        return responseMessage;
      } else {
        return "Unexpected response: $responseMessage";
      }
    } else {
      return "Failed to place order: ${response.statusCode}";
    }
  } catch (e) {
    return "An error occurred: $e";
  }
}
