import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { updateUserInfo } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";

import styles from "./EditUserForm.module.css";

const schema = Yup.object().shape({
  avatar: Yup.string().url("Enter a valid URL").required("Required"),
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

  const initialValues = {
    avatar: user.avatarURL || "",
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "+380",
  };

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    dispatch(updateUserInfo(values))
      .unwrap()

      .then(() => {
        resetForm();
        onClose();
      })
      .catch((err) => console.log("Update error:", err));
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <h2 className={styles.title}>Edit information</h2>

            <div className={styles.avatarPreview}>
              <img
                src={values.avatar || "https://via.placeholder.com/100"}
                alt="User Avatar"
                className={styles.roundAvatar}
              />
            </div>

            <div className={styles.inputsWrapper}>
              <div className={styles.inputGroup}>
                <div className={styles.fieldBlock}>
                  <div className={styles.inputAndButtonWrapper}>
                    <Field
                      name="avatar"
                      placeholder="https://..."
                      className={styles.inputWithButton}
                    />
                    <button
                      type="button"
                      className={styles.uploadBtn}
                      onClick={() => {
                        setFieldValue("avatar", values.avatar);
                      }}
                    >
                      Upload photo ☁️
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
