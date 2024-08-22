import {
  AntDesign,
  Feather,
  Fontisto,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";

export const icons = {
  index: (props) => <Octicons name="home" size={22} {...props} />,
  profile: (props) => <Feather name="user" size={24} {...props} />,
  community: (props) => <Octicons name="people" size={24} {...props} />,
  chats: (props) => <Fontisto name="hipchat" size={24} {...props} />,
};
