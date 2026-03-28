import { useEffect, useState } from "react";
import axios from "axios";

import type { FriendData } from "../../components/FriendsItem/FriendsItem";
import styles from "./OurFriendsPage.module.css";
import FriendsList from "../../components/FriendsList/FriendsList";

export default function OurFriendsPage() {
  const [friends, setFriends] = useState<FriendData[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://petlove.b.goit.study/api/friends",
        );

        setFriends(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке друзей:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Our Friends</h2>

        {isLoading ? <p>Loading...</p> : <FriendsList items={friends} />}
      </div>
    </section>
  );
}
