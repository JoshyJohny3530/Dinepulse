import 'package:dinepulse_mobileapp/models/global_state.dart';
import 'package:dinepulse_mobileapp/screens/popups/customer_count_popup.dart';
import 'package:flutter/material.dart';
import '../widgets/custom_app_bar.dart';
import '../models/global_state.dart' as global_state;

class ChooseTablePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'CHOOSE TABLES',
        showProfileIcon: true,
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/background-pages.png'),
            fit: BoxFit.cover,
          ),
        ),
        child: GridView.builder(
          padding: EdgeInsets.all(16.0),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 16.0,
            mainAxisSpacing: 16.0,
          ),
          itemCount: 12,
          itemBuilder: (context, index) {
            bool isSelectedTable = selectedTable == index + 1;
            global_state.selectedTable = index + 1;
            return GestureDetector(
              onTap: () {
                if (isSelectedTable) {
                  showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                      title: Text(
                        'Table Information',
                        style: TextStyle(
                          color: Color.fromRGBO(203, 79, 41, 1),
                          fontSize: 15,
                          fontFamily: 'Calistoga',
                        ),
                      ),
                      content: Text(
                        'Table: $selectedTable\nCustomers: $customerCount',
                        style: TextStyle(
                          fontSize: 16,
                          color: Color.fromRGBO(203, 79, 41, 1),
                          fontFamily: 'Calistoga',
                        ),
                      ),
                      actions: [
                        TextButton(
                          onPressed: () {
                            Navigator.pop(context);
                            Navigator.pushNamed(
                              context,
                              '/menu',
                              arguments: {
                                'table': selectedTable,
                                'count': customerCount,
                              },
                            );
                          },
                          child: Text(
                            'OK',
                            style: TextStyle(
                              color: Color.fromRGBO(203, 79, 41, 1),
                              fontSize: 14,
                              fontFamily: 'Calistoga',
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                } else {
                  showCustomerCountPopup(context, index);
                }
              },
              child: Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
                color: isSelectedTable
                    ? Colors.grey
                    : Color.fromRGBO(248, 143, 143, 1.0),
                child: Center(
                  child: Text(
                    'TABLE ${index + 1}',
                    style: TextStyle(
                      color: Colors.black87,
                      fontSize: 14,
                      fontFamily: 'Calistoga',
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
