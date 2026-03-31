import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { updateUserInfo } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";
import { useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

import styles from "./EditUserForm.module.css";

const schema = Yup.object().shape({
  avatar: Yup.mixed().required("Required"), // mixed подходит для файлов
  name: Yup.string().min(2, "Too short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Format: +380XXXXXXXXX")
    .required("Required"),
});

interface Props {
  onClose: () => void;
}

export const EditUserForm = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues = {
    avatar: user.avatarURL || "",
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "+380",
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // В useEffect следите за очисткой памяти
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    dispatch(updateUserInfo(values))
      .unwrap()
      .then(() => {
        // Очищаем временную ссылку перед закрытием
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        resetForm();
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <h2 className={styles.title}>Edit information</h2>

            <div className={styles.avatarPreview}>
              {values.avatar ? (
                <img
                  src={
                    previewUrl ||
                    (typeof values.avatar === "string" ? values.avatar : "") ||
                    user.avatarURL ||
                    "https://via.placeholder.com/100"
                  }
                  alt="User Avatar"
                  className={styles.roundAvatar}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/100";
                  }}
                />
              ) : (
                <div className={styles.emptyAvatar}>
                  <FaUser size={44} />
                </div>
              )}
            </div>

            <div className={styles.inputsWrapper}>
              <div className={styles.inputGroup}>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue("avatar", file);
                      if (previewUrl) URL.createObjectURL(file);
                      const objectUrl = URL.createObjectURL(file);
                      setPreviewUrl(objectUrl);
                    }
                  }}
                />
                <div className={styles.fieldBlock}>
                  <div className={styles.inputAndButtonWrapper}>
                    <input
                      readOnly
                      placeholder="Upload your photo"
                      value={
                        values.avatar instanceof File
                          ? values.avatar.name
                          : values.avatar
                      }
                      className={styles.inputWithButton}
                    />
                    <button
                      type="button"
                      className={styles.uploadBtn}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload photo
                      <svg className={styles.uploadIcon}>
                        <use href="/sprite.svg#icon-cloud" />
                      </svg>
                    </button>
                  </div>
                  <ErrorMessage
                    name="avatar"
                    component="p"
                    className={styles.error}
                  />
                </div>
              </div>

              <div className={styles.fieldBlock}>
                <Field
                  name="name"
                  placeholder="Name"
                  className={styles.input}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldBlock}>
                <Field
                  name="email"
                  placeholder="Email"
                  className={styles.input}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldBlock}>
                <Field
                  name="phone"
                  placeholder="Phone"
                  className={styles.input}
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className={styles.error}
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Go to profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
