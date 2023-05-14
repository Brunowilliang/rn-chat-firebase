import * as React from "react";
import { Dimensions, View, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";

import Pressable from "~/components/pressable";

import { useToggleButton } from "~/components/TabBar/useToggleButton";
const window = Dimensions.get("window");

const PAGE_WIDTH = 60;
const PAGE_HEIGHT = 40;
const DATA = ["tab1", "tab2", "tab3", "tab4", "tab5", "tab6", "tab7"];

export function AnimatedTabBar() {
  const r = React.useRef<ICarouselInstance>(null);
  const AutoPLay = useToggleButton({
    defaultValue: false,
  });
  const [loop, setLoop] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginVertical: 100 }}>
        <Carousel
          key={`${loop}`}
          ref={r}
          loop={loop}
          style={{
            width: window.width,
            height: PAGE_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#0071fa",
          }}
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          data={DATA}
          renderItem={({ item, animationValue }) => {
            return (
              <Item
                animationValue={animationValue}
                label={item}
                onPress={() =>
                  r.current?.scrollTo({
                    count: animationValue.value,
                    animated: true,
                  })
                }
              />
            );
          }}
          autoPlay={AutoPLay.status}
        />
      </View>
      <Pressable onPress={() => setLoop(!loop)}>
        <Text>Loop: {loop}</Text>
      </Pressable>
      <View
        style={{
          marginTop: 24,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Pressable onPress={() => r.current?.prev()}>
          <Text>{"Prev"}</Text>
        </Pressable>
        <Pressable onPress={() => r.current?.next()}>
          <Text>{"Next"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AnimatedTabBar;

interface Props {
  animationValue: Animated.SharedValue<number>
  label: string
  onPress?: () => void
}

const Item: React.FC<Props> = (props) => {
  const { animationValue, label, onPress } = props;

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  }, [animationValue]);

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    );

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#b6bbc0", "#0071fa", "#b6bbc0"],
    );

    return {
      transform: [{ scale }, { translateY: translateY.value }],
      color,
    };
  }, [animationValue, translateY]);

  const onPressIn = React.useCallback(() => {
    translateY.value = withTiming(-8, { duration: 250 });
  }, [translateY]);

  const onPressOut = React.useCallback(() => {
    translateY.value = withTiming(0, { duration: 250 });
  }, [translateY]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          {
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
          containerStyle,
        ]}
      >
        <Animated.Text style={[{ fontSize: 18, color: "#26292E" }, labelStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};