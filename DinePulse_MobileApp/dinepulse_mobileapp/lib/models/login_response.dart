class LoginResponse {
  final bool loginStatus;
  final String loginMessage;

  LoginResponse({required this.loginStatus, required this.loginMessage});

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      loginStatus: json['loginStatus'],
      loginMessage: json['loginMessage'],
    );
  }
}
