import { Text, View, Image, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { signIn, getCurrentUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <View className="flex flex-row justify-start items-center w-full mt-[-10px]">
            <Image
              source={images.logoSmall}
              className="w-[35px] h-[35px]"
              resizeMode="contain"
            />
            <Text className="text-white text-4xl font-psemibold mt-2">
              Aula
            </Text>
          </View>

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aula
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
