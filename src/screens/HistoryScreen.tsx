import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TransactionContext } from "../context/TransactionContext";
import TransactionCard from "../components/cards/TransactionCard";

const HistoryScreen = () => {
  const { transactions } = useContext(TransactionContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>No transactions yet.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item._id || Math.random().toString()}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 12 },
  emptyText: { fontSize: 16, color: "#999", textAlign: "center", marginTop: 50 },
});

export default HistoryScreen;
