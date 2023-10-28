import { View } from "react-native";
import tw from "../libs/tailwind";

export const SkeletonCard = ({ isLoading }: { isLoading?: boolean }) => (
  <View style={tw`relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`}>
    <View style={tw`space-y-3`}>
      <View style={tw`h-14 rounded-lg bg-gray-700`}/>
      <View style={tw`h-3 w-11/12 rounded-lg bg-gray-700`} />
      <View style={tw`h-3 w-8/12 rounded-lg bg-gray-700`} />
    </View>
  </View>
);