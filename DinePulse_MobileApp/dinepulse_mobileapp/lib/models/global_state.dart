library dinepulse.global_state;

int? selectedTable;
int? customerCount;

void setSelectedTable(int table, int count) {
  selectedTable = table;
  customerCount = count;
}

void clearSelectedTable() {
  selectedTable = null;
  customerCount = null;
}
