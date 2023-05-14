import * as React from "react";

import Pressable from "~/components/pressable";
import Text from "~/components/text";

export function useToggleButton(opts: {
  defaultValue: boolean
  buttonTitle?: string
}) {
  const { buttonTitle, defaultValue = false } = opts;
  const [status, setStatus] = React.useState(defaultValue);

  const button = React.useMemo(() => {
    return (
      <Pressable onPress={() => setStatus(!status)}>
        <Text>
          {status}
        </Text>
      </Pressable>
    );
  }, [status, buttonTitle]);

  return {
    status,
    button,
  };
}