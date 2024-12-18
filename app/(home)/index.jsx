import { Link, Stack } from "expo-router";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function LogoTitle({ avatar }) {
  const [isAvatarActive, setIsAvatarActive] = useState(true);

  return (
    <TouchableOpacity
      style={[
        styles.avatarContainer,
        { borderColor: isAvatarActive ? "#4cc4c2" : "#19918F" },
      ]}
      onPress={() => setIsAvatarActive((prev) => !prev)}
      activeOpacity={0.8}
    >
      <Image style={styles.image} source={{ uri: avatar }} />
    </TouchableOpacity>
  );
}

export default function Home() {
  const [showBalance, setShowBalance] = useState(true);
  const [user, setUser] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get("https://walled-api.vercel.app/profile", {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          });
          const user = res.data.data;
          setUser(user);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [refreshing]);
  useEffect(() => {
    const getTransaction = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "https://walled-api.vercel.app/transactions",
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            }
          );
          const transaction = res.data.data;
          setTransaction(transaction);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTransaction();
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      containerStyle={styles.container}
    >
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <LogoTitle avatar={user?.avatar_url} />
          <View>
            {user?.fullname && (
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {user.fullname}
              </Text>
            )}
            <Text style={{ fontSize: 18 }}>Personal Account</Text>
          </View>
        </View>
        <Image source={require("../../assets/suntoggle.png")} />
      </View>
      <View style={{ backgroundColor: "#FAFBFD", paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 25,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "70%" }}>
            {user?.fullname && (
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Good Morning, {user?.fullname}
              </Text>
            )}
            <Text style={{ fontSize: 18 }}>
              Check all your incoming and outgoing transactions here
            </Text>
          </View>
          <Image
            source={require("../../assets/Sun.png")}
            style={{ width: 81, height: 77 }}
          />
        </View>

        <View style={styles.accountnumber}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Account No.</Text>
          {user?.id && (
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
              {user?.wallet.account_number}
            </Text>
          )}
        </View>

        <View style={styles.balancebox}>
          <View>
            <Text style={{ color: "black", fontSize: 18 }}>Balance</Text>
            <View style={{ gap: 2 }}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {showBalance
                  ? `Rp${user.wallet?.balance.toLocaleString("id-ID")}`
                  : "Rp ****"}
                <TouchableOpacity
                  onPress={() => setShowBalance((prev) => !prev)}
                >
                  <Image
                    source={require("../../assets/view.png")}
                    style={{ width: 18, height: 18, marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </Text>
            </View>
          </View>

          <View>
            <View style={{ gap: 20 }}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#19918F",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome6 size={18} name="add" color={"#fff"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#19918F",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome size={18} name="send" color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            marginTop: 40,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              padding: 20,
              borderBottomColor: "#b3b3b3",
              borderBottomWidth: 0.5,
            }}
          >
            Transaction History
          </Text>
          {transaction?.map((tx) => (
            <View
              key={transaction?.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <View>
                <Text style={{ fontSize: 19 }}>{user?.fullname}</Text>
                <Text style={{ fontSize: 16 }}>{tx?.transaction_type}</Text>
                <Text style={{ fontSize: 14, color: "#b3b3b3" }}>
                  {tx?.transaction_date}
                </Text>
              </View>
              {/* <Text
                style={{
                  fontSize: 18,
                  color: tx?.transaction_type === "transfer" ? "red" : "green",
                }}
              >
                {tx?.transaction_type === "transfer" ? "-" : "+"} Rp {tx.amount}
              </Text> */}
              <Text style={{fontSize: 18, color:tx?.transaction_type === "transfer" && tx.amount > 0 ? "green" : "red",}}>
                {tx?.transaction_type === "transfer" && tx.amount > 0 ? `+ Rp ${tx.amount}` : `- Rp ${tx.amount}`}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const user = {
  fullname: "John Doe",
  typeofaccount: "Personal Account",
  accountnumber: "123456789",
  balance: "10.000.000",
};

// const transactions = [
//   {
//     id: 1,
//     date: "08 December 2024",
//     amount: "75.000",
//     name: "Flazz",
//     type: "Topup",
//     debit: false,
//   },
//   {
//     id: 2,
//     date: "06 December 2024",
//     amount: "80.000",
//     name: "Aisyah",
//     type: "Transfer",
//     debit: true,
//   },
//   {
//     id: 3,
//     date: "04 December 2024",
//     amount: "175.000",
//     name: "Baetris",
//     type: "Transfer",
//     debit: true,
//   },
//   {
//     id: 4,
//     date: "02 December 2024",
//     amount: "55.000",
//     name: "Isna",
//     type: "Transfer",
//     debit: false,
//   },
// ];

const styles = StyleSheet.create({
  balancebox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#19918F",
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
});
