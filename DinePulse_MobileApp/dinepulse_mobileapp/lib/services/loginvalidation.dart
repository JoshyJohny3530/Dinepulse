import 'dart:convert';
import 'package:dinepulse_mobileapp/models/login_response.dart';
import 'package:dinepulse_mobileapp/services/global_variables.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

Future<LoginResponse> loginUser(String userName, String userPassword) async {
  final url = Uri.parse('${dotenv.env['APP_API']}/MobileLogin/LoginUser');
  final headers = {"Content-Type": "application/json"};
  final body = json.encode({
    "userName": userName,
    "userPassword": userPassword,
  });

  final response = await http.post(url, headers: headers, body: body);

  if (response.statusCode == 200) {
    // Successful login
    //return LoginResponse.fromJson(json.decode(response.body));
    final Map<String, dynamic> responseData = jsonDecode(response.body);
    //responseData['message'];
    GlobalVariables().username = responseData['userName'];
    GlobalVariables().userid = responseData['userId'];
    return LoginResponse(
      loginStatus: true,
      loginMessage: "Login Success.",
    );
  } else if (response.statusCode == 401) {
    // Unauthorized
    return LoginResponse(
      loginStatus: false,
      loginMessage: "Invalid username or password.",
    );
  } else {
    // Error occurred
    return LoginResponse(
      loginStatus: false,
      loginMessage: "An error occurred: ${response.statusCode}",
    );
  }
}
