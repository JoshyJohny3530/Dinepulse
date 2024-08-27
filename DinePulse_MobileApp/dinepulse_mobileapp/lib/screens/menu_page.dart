import 'package:dinepulse_mobileapp/models/global_state.dart';
import 'package:dinepulse_mobileapp/screens/popups/item_add_popup.dart';
import 'package:dinepulse_mobileapp/services/menu_fetch.dart';
import 'package:flutter/material.dart';
import '../widgets/custom_app_bar.dart';
import '../models/cart_item.dart';
import '../services/cart_service.dart';
import '../widgets/category_button.dart';

class MenuPage extends StatefulWidget {
  const MenuPage({super.key});

  @override
  _MenuPageState createState() => _MenuPageState();
}

class _MenuPageState extends State<MenuPage> {
  late Future<List<CartItem>> futureMenuItems;

  @override
  void initState() {
    super.initState();
    futureMenuItems = fetchMenu();
  }

  void _addToCart(CartItem item) {
    setState(() {
      cartService.addItem(item);
    });
  }

  @override
  Widget build(BuildContext context) {
    OutlineInputBorder borderColor(Color input) {
      return OutlineInputBorder(
        borderRadius: BorderRadius.circular(9.0),
        borderSide: BorderSide(
          color: input,
        ),
      );
    }

    return Scaffold(
      appBar: CustomAppBar(
        title: 'SELECT CATEGORY',
        showCartIcon: true,
        showProfileIcon: true,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Table: $selectedTable',
                  style: const TextStyle(
                    color: Color.fromRGBO(203, 79, 41, 1),
                    fontSize: 15,
                    fontFamily: 'Calistoga',
                  ),
                ),
                Text(
                  'Customers: $customerCount',
                  style: const TextStyle(
                    color: Color.fromRGBO(203, 79, 41, 1),
                    fontSize: 15,
                    fontFamily: 'Calistoga',
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search...',
                border: borderColor(const Color.fromRGBO(203, 79, 41, 1)),
                focusedBorder:
                    borderColor(const Color.fromRGBO(113, 36, 12, 1)),
                enabledBorder:
                    borderColor(const Color.fromRGBO(203, 79, 41, 1)),
              ),
            ),
          ),
          const SizedBox(height: 10),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  CategoryButton(
                    label: 'All',
                    icon: Icons.category,
                    iconColor: Colors.white,
                    fontSize: 12,
                    backgroundColor: Color.fromRGBO(203, 79, 41, 1),
                    borderRadius: 8.0,
                  ),
                  CategoryButton(
                    label: 'Starters',
                    icon: Icons.restaurant_menu,
                    iconColor: Colors.white,
                    fontSize: 12,
                    backgroundColor: Color.fromRGBO(203, 79, 41, 1),
                    borderRadius: 8.0,
                  ),
                  CategoryButton(
                    label: 'Main Course',
                    icon: Icons.fastfood,
                    iconColor: Colors.white,
                    fontSize: 12,
                    backgroundColor: Color.fromRGBO(203, 79, 41, 1),
                    borderRadius: 8.0,
                  ),
                  CategoryButton(
                    label: 'Cold Drinks',
                    icon: Icons.local_drink,
                    iconColor: Colors.white,
                    fontSize: 12,
                    backgroundColor: Color.fromRGBO(203, 79, 41, 1),
                    borderRadius: 8.0,
                  ),
                  CategoryButton(
                    label: 'Hot Drinks',
                    icon: Icons.local_cafe,
                    iconColor: Colors.white,
                    fontSize: 12,
                    backgroundColor: Color.fromRGBO(203, 79, 41, 1),
                    borderRadius: 8.0,
                  ),
                  CategoryButton(
                    label: 'Desserts',
                    icon: Icons.cake,
                    iconColor: Colors.white,
                    fontSize: 12,
                    backgroundColor: Color.fromRGBO(203, 79, 41, 1),
                    borderRadius: 8.0,
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            child: FutureBuilder<List<CartItem>>(
              future: futureMenuItems,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Center(child: Text('Error: ${snapshot.error}'));
                } else if (snapshot.hasData) {
                  final menuItems = snapshot.data!;
                  return ListView.builder(
                    padding: const EdgeInsets.all(16.0),
                    itemCount: menuItems.length,
                    itemBuilder: (context, index) {
                      return Card(
                        color: const Color.fromRGBO(255, 244, 226, 1),
                        margin: const EdgeInsets.symmetric(vertical: 8.0),
                        child: ListTile(
                          leading: Image.network(
                            menuItems[index].imagePath,
                            width: 50,
                            height: 50,
                            fit: BoxFit.cover,
                          ),
                          title: Text(
                            menuItems[index].name,
                            style: const TextStyle(
                              color: Color.fromRGBO(203, 79, 41, 1),
                              fontSize: 15,
                              fontFamily: 'Calistoga',
                            ),
                          ),
                          subtitle: Text(
                            'Price: \$${menuItems[index].price.toStringAsFixed(2)}',
                            style: const TextStyle(
                              color: Color.fromRGBO(203, 79, 41, 1),
                              fontSize: 12,
                              fontFamily: 'Calistoga',
                            ),
                          ),
                          trailing: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor:
                                  const Color.fromRGBO(203, 79, 41, 1),
                              elevation: 0,
                              padding: EdgeInsets.zero,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(4.0),
                              ),
                            ),
                            child: const Text(
                              "ADD",
                              style: TextStyle(
                                fontSize: 11,
                                fontFamily: 'Calistoga',
                                color: Colors.white,
                              ),
                            ),
                            onPressed: () {
                              showItemAddPopup(
                                  context, menuItems[index], _addToCart);
                            },
                          ),
                        ),
                      );
                    },
                  );
                } else {
                  return const Center(child: Text('No data available'));
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}
