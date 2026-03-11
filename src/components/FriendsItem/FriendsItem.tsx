import styles from "./FriendsItem.module.css";

interface WorkDay {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
}

export interface FriendData {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address: string;
  workDays: WorkDay[];
  phone: string;
  email: string;
}

interface FriendsItemProps {
  data: FriendData;
}

export default function FriendsItem({ data }: FriendsItemProps) {
  const { title, imageUrl, email, address, phone, workDays, addressUrl } = data;

  // Находим первый попавшийся рабочий интервал для примера
  // (Позже можно сделать проверку по текущему дню недели)
  const openDay = Array.isArray(workDays)
    ? workDays.find((day) => day.isOpen)
    : null;

  const workingHours =
    openDay && openDay.from && openDay.to
      ? `${openDay.from} - ${openDay.to}`
      : "Day and night";

  return (
    <li className={styles.card}>
      <div className={styles.timeBadge}>{workingHours}</div>

      <div className={styles.flexContainer}>
        <div className={styles.imageThumb}>
          <img src={imageUrl} alt={title} />
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{title}</h3>

          <ul className={styles.contactsList}>
            {/* EMAIL */}
            <li>
              <span className={styles.label}>Email: </span>
              {email ? (
                <a href={`mailto:${email}`} className={styles.link}>
                  {email}
                </a>
              ) : (
                <span className={styles.link}>website only</span>
              )}
            </li>

            {/* ADDRESS */}
            <li>
              <span className={styles.label}>Address: </span>
              {address ? (
                <a
                  href={addressUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  {address}
                </a>
              ) : (
                <span className={styles.link}>website only</span>
              )}
            </li>

            {/* PHONE */}
            <li>
              <span className={styles.label}>Phone: </span>
              {phone ? (
                <a href={`tel:${phone}`} className={styles.link}>
                  {phone}
                </a>
              ) : (
                <span className={styles.link}>email only</span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}
