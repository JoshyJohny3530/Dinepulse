class GlobalVariables {
  static final GlobalVariables _instance = GlobalVariables._internal();

  late String username;
  late int userid;
  factory GlobalVariables() {
    return _instance;
  }

  GlobalVariables._internal();
}
