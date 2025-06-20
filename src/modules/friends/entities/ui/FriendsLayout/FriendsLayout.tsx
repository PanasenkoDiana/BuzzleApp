import { ReactNode } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./FriendsLayout.styles";

interface IFriendsLayout {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  children: ReactNode;
}

export function FriendsLayout(props: IFriendsLayout) {
  const { selectedPage, setSelectedPage, children } = props;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity
            onPress={() => setSelectedPage("main")}
            style={[styles.navButtom]}
          >
            {selectedPage === "main" && <View style={styles.selectedBlock} />}
            <Text style={styles.navText}>Головна</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedPage("requests")}
            style={[styles.navButtom]}
          >
            {selectedPage === "requests" && (
              <View style={styles.selectedBlock} />
            )}
            <Text style={styles.navText}>Запити</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedPage("recommends")}
            style={[styles.navButtom]}
          >
            {selectedPage === "recommends" && (
              <View style={styles.selectedBlock} />
            )}
            <Text style={styles.navText}>Рекомендації</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedPage("all")}
            style={[styles.navButtom]}
          >
            {selectedPage === "all" && <View style={styles.selectedBlock} />}
            <Text style={styles.navText}>Всі друзі</Text>
          </TouchableOpacity>
        </View>
      </View>
      {children}
    </View>
  );
}
