import 'package:flutter/material.dart';
import 'login_page.dart';

class OnBoardingView extends StatefulWidget {
  const OnBoardingView({super.key});

  @override
  State<OnBoardingView> createState() => _OnBoardingViewState();
}

class _OnBoardingViewState extends State<OnBoardingView> {
  int selectedPage = 0;
  PageController controller = PageController();

  List pagecontentsArray = [
    {
      "title": "Find Food You Love",
      "subtitle":
          "Explore DinePulse: Discover diverse flavors and fast,\nreliable delivery right to your door.",
      "image": "assets/images/landing-screen-1.png",
    },
    {
      "title": "Quick Delivery at your Doorstep",
      "subtitle":
          "Bringing delicious meals swiftly to your doorstep,\noffering a diverse range of culinary delights to satisfy your cravings.",
      "image": "assets/images/landing-screen-2.png",
    },
    {
      "title": "Easy and Online Payment",
      "subtitle":
          "Simplifying your dining experience with \nsecure, effortless online payments.",
      "image": "assets/images/landing-screen-3.png",
    },
  ];

  @override
  void initState() {
    super.initState();

    controller.addListener(() {
      setState(() {
        selectedPage = controller.page?.round() ?? 0;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        alignment: Alignment.center,
        children: [
          PageView.builder(
            controller: controller,
            itemCount: pagecontentsArray.length,
            itemBuilder: ((context, index) {
              var pObj = pagecontentsArray[index] as Map? ?? {};
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    alignment: Alignment.center,
                    child: Image.asset(
                      pObj["image"].toString(),
                      width: 390,
                      height: 390,
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(height: 20.0),
                  Text(
                    pObj["title"].toString(),
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: Color.fromRGBO(203, 79, 41, 1),
                      fontSize: 28,
                      fontFamily: 'Calistoga',
                    ),
                  ),
                  const SizedBox(height: 10.0),
                  Text(
                    pObj["subtitle"].toString(),
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: Color.fromARGB(221, 33, 33, 33),
                      fontSize: 13,
                      fontFamily: 'Calistoga',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              );
            }),
          ),
          Positioned(
            bottom: 10.0,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: pagecontentsArray.map((e) {
                    var index = pagecontentsArray.indexOf(e);
                    return Container(
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      height: 8,
                      width: 8,
                      decoration: BoxDecoration(
                        color:
                            index == selectedPage ? Colors.red : Colors.brown,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 16.0),
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20.0),
                    color: const Color.fromRGBO(203, 79, 41, 1),
                  ),
                  child: IconButton(
                    onPressed: () {
                      if (selectedPage >= 2) {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => LoginPage(),
                          ),
                        );
                      } else {
                        setState(() {
                          selectedPage = selectedPage + 1;
                          controller.animateToPage(selectedPage,
                              duration: const Duration(milliseconds: 500),
                              curve: Curves.easeInOut);
                        });
                      }
                    },
                    icon: const Icon(Icons.arrow_forward),
                    iconSize: 15.0,
                    color: Colors.white,
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
