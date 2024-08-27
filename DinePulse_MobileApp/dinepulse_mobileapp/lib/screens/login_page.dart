import 'package:dinepulse_mobileapp/services/loginvalidation.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class LoginPage extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  final _userIdController = TextEditingController();
  final _passwordController = TextEditingController();

  LoginPage({super.key});

  OutlineInputBorder borderColor(Color input) {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(9.0),
      borderSide: BorderSide(
        color: input,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
                'assets/images/background-login.png'), // https://www.canva.com/design/DAGFhDd9T5E/yp6AFo724Do08iUkldbROw/edit
            fit: BoxFit.cover,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Center(
              child: SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(height: 10),
                    Image.asset(
                      'assets/images/restaurant_logo.png',
                      width: 200,
                      height: 200,
                    ),
                    const Text(
                      'DINEPULSE',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Color.fromRGBO(203, 79, 41, 1),
                        fontFamily: 'Calistoga',
                        letterSpacing: 1,
                      ),
                    ),
                    const SizedBox(height: 20),
                    Container(
                      width: 300,
                      child: TextFormField(
                        controller: _userIdController,
                        decoration: InputDecoration(
                          labelText: 'Staff user id',
                          labelStyle: const TextStyle(
                            color: Color.fromARGB(221, 33, 33, 33),
                            fontFamily: 'Calistoga',
                          ),
                          border:
                              borderColor(const Color.fromRGBO(203, 79, 41, 1)),
                          focusedBorder:
                              borderColor(const Color.fromRGBO(113, 36, 12, 1)),
                          enabledBorder:
                              borderColor(const Color.fromRGBO(203, 79, 41, 1)),
                          suffixIcon: const Icon(
                            Icons.person,
                            color: Color.fromRGBO(203, 79, 41, 1),
                          ),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 16),
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'User ID Required';
                          }
                          return null;
                        },
                      ),
                    ),
                    const SizedBox(height: 10),
                    Container(
                      width: 300,
                      child: TextFormField(
                        controller: _passwordController,
                        decoration: InputDecoration(
                          labelText: 'Password',
                          labelStyle: const TextStyle(
                            color: Color.fromARGB(221, 33, 33, 33),
                            fontFamily: 'Calistoga',
                          ),
                          border:
                              borderColor(const Color.fromRGBO(203, 79, 41, 1)),
                          focusedBorder:
                              borderColor(const Color.fromRGBO(113, 36, 12, 1)),
                          enabledBorder:
                              borderColor(const Color.fromRGBO(203, 79, 41, 1)),
                          suffixIcon: const Icon(
                            Icons.lock,
                            color: Color.fromRGBO(203, 79, 41, 1),
                          ),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 16),
                        ),
                        obscureText: true,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Password Required';
                          }
                          return null;
                        },
                      ),
                    ),
                    const SizedBox(height: 20),
                    Center(
                      child: Container(
                        width: 200,
                        child: ElevatedButton(
                          onPressed: () async {
                            if (_formKey.currentState!.validate()) {
                              final username = _userIdController.text;
                              final password = _passwordController.text;
                              final response =
                                  await loginUser(username, password);
                              if (response.loginStatus) {
                                Navigator.pushReplacementNamed(
                                    context, '/home');
                              } else {
                                Fluttertoast.showToast(
                                    msg: response.loginMessage,
                                    toastLength: Toast.LENGTH_SHORT,
                                    gravity: ToastGravity.CENTER,
                                    timeInSecForIosWeb: 1,
                                    backgroundColor: Colors.red,
                                    textColor: Colors.white,
                                    fontSize: 16.0);
                              }
                            }
                          },
                          style: ElevatedButton.styleFrom(
                            foregroundColor: Colors.white,
                            elevation: 0,
                            padding: EdgeInsets.zero,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(4.0),
                            ),
                          ),
                          child: Ink(
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(
                                colors: [
                                  Color.fromRGBO(255, 49, 49, 1),
                                  Color.fromRGBO(255, 145, 77, 1),
                                ],
                                begin: Alignment.centerLeft,
                                end: Alignment.centerRight,
                              ),
                              borderRadius: BorderRadius.circular(4.0),
                            ),
                            child: Container(
                              constraints: const BoxConstraints(
                                  minWidth: 88.0, minHeight: 36.0),
                              alignment: Alignment.center,
                              child: const Text(
                                'LOGIN',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontFamily: 'Calistoga',
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
