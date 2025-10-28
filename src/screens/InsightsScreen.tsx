import React, { useContext, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TransactionContext } from "../context/TransactionContext";

const InsightsScreen = () => {
  const { transactions } = useContext(TransactionContext);

  const stats = useMemo(() => {
    const total = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    return {
      count: transactions.length,
      total,
      average: transactions.length > 0 ? (total / transactions.length).toFixed(2) : 0,
    };
  }, [transactions]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insights</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Total Transactions:</Text>
        <Text style={styles.value}>{stats.count}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>₹{stats.total}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Average Transaction:</Text>
        <Text style={styles.value}>₹{stats.average}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 16 },
  card: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: { fontSize: 16, color: "#555" },
  value: { fontSize: 18, fontWeight: "600", color: "#111" },
});

export default InsightsScreen;
