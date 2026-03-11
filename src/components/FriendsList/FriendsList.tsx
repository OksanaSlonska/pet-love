import FriendsItem from "../FriendsItem/FriendsItem";
import type { FriendData } from "../FriendsItem/FriendsItem";
import styles from "./FriendsList.module.css";

interface FriendsListProps {
  items: FriendData[];
}

export default function FriendsList({ items }: FriendsListProps) {
  return (
    <ul className={styles.list}>
      {items.map((friend) => (
        <li key={friend._id} className={styles.listItem}>
          <FriendsItem data={friend} />
        </li>
      ))}
    </ul>
  );
}
