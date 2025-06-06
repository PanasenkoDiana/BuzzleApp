import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPost } from "../../modules/userpost/pages/UserPost";
import { COLORS } from "../../shared/ui/colors";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { SecondRegisterModal } from "../../modules/auth/ui/second-register-modal";
import { Ionicons } from "@expo/vector-icons";

export default function MainPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("showRegisterModal") === "true") {
      setIsModalOpen(true);
    }
  }, []);

  return (
    <>
      {isModalOpen && (
        <SecondRegisterModal
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <UserPost haveHeader={true} />
    </>
  );
}
