import 'package:flutter/material.dart';
import 'dart:async';

class SplashPage extends StatefulWidget {
  @override
  _SplashPageState createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    Timer(Duration(seconds: 4), () {
      Navigator.pushReplacementNamed(context, '/onboardingscreens');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage(
                    'assets/images/background-splash.png'), // https://www.canva.com/design/DAGFcXs5WiU/NyX_VBsl0lwZA43H6Y7WlA/edit
                fit: BoxFit.cover,
              ),
            ),
          ),
          const Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Image(
                  image: AssetImage('assets/images/restaurant_logo.png'),
                  width: 300,
                  height: 220,
                ),
                Text(
                  'DINEPULSE',
                  style: TextStyle(
                    fontSize: 45,
                    color: Color.fromRGBO(203, 79, 41, 1),
                    fontFamily: 'Calistoga',
                    letterSpacing: 1,
                  ),
                ),
                SizedBox(height: 10.0),
                Text(
                  'Savor the goodness, embrace wellness!!!',
                  style: TextStyle(
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Calistoga',
                    color: Color.fromARGB(221, 33, 33, 33),
                    letterSpacing: 0.5,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
