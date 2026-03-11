import { useEffect, useState } from "react";
import axios from "axios";

import type { FriendData } from "../../components/FriendsItem/FriendsItem";
import styles from "./OurFriendsPage.module.css";
import FriendsList from "../../components/FriendsList/FriendsList";

export default function OurFriendsPage() {
  // 1. Создаем состояние для списка друзей
  const [friends, setFriends] = useState<FriendData[]>([]);
  // 2. (Опционально) Состояние загрузки, чтобы показать спиннер
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Функция для запроса
    const fetchFriends = async () => {
      try {
        console.log("1. Запрос начался...");
        setIsLoading(true);
        const response = await axios.get(
          "https://petlove.b.goit.study/api/friends",
        );
        // В axios данные лежат в поле .data
        console.log("2. Данные получены:", response.data);
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
