import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FiX, FiCheck } from "react-icons/fi";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { logIn, refreshUser } from "../../redux/auth/operations";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import type { AppDispatch } from "../../redux/store";
import styles from "../RegistrationPage/RegistrationPage.module.css";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await dispatch(logIn(values)).unwrap();
      await dispatch(refreshUser()).unwrap();

      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageWrapper}>
        <div className={styles.imageSection}>
          <picture>
            <source
              media="(min-width: 1280px)"
              srcSet="/images/dog-desktop-1x.webp 1x, /images/dog-desktop-2x.webp 2x"
              type="image/webp"
            />

            <source
              media="(min-width: 768px)"
              srcSet="/images/dog-tablet-1x.webp 1x, /images/dog-tablet-2x.webp 2x"
              type="image/webp"
            />

            <img
              src="/images/dog-mobile-1x.webp"
              alt="Cute dog"
              className={styles.catImg}
            />
          </picture>

          <div className={styles.petCard}>
            <div className={styles.petAvatar}>
              <img src="/images/dog.webp" alt="Rich" />
            </div>
            <div className={styles.petInfo}>
              <div className={styles.petHeader}>
                <h3 className={styles.petName}>Rich</h3>
                <p className={styles.petBirthday}>
                  Birthday: <span>21.09.2020</span>
                </p>
              </div>
              <p className={styles.petDesc}>
                Rich would be the perfect addition to an active family that
                loves to play and go on walks. I bet he would love having a
                doggy playmate too!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.title}>Log in</h2>
          <p className={styles.text}>
            Welcome! Please enter your credentials to login to the platform:
          </p>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className={styles.form}>
                {/* --- Email --- */}
                <div className={styles.inputWrapper}>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`${styles.input} ${
                      touched.email && errors.email
                        ? styles.inputError
                        : touched.email && !errors.email
                          ? styles.inputSuccess
                          : ""
                    }`}
                  />
                  <div className={styles.iconWrapper}>
                    {touched.email && errors.email ? (
                      <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={() => setFieldValue("email", "")}
                      >
                        <FiX color="#ef2447" size={18} />
                      </button>
                    ) : touched.email && !errors.email ? (
                      <FiCheck color="#08aa58" size={18} />
                    ) : null}
                  </div>
                  <ErrorMessage
                    name="email"
                    component="span"
                    className={styles.errorText}
                  />
                </div>

                {/* --- Password --- */}
                <div className={styles.inputWrapper}>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`${styles.input} ${
                      touched.password && errors.password
                        ? styles.inputError
                        : touched.password && !errors.password
                          ? styles.inputSuccess
                          : ""
                    }`}
                  />
                  <div className={styles.iconWrapper}>
                    {touched.password && errors.password && (
                      <FiX color="#ef2447" size={18} />
                    )}
                    {touched.password && !errors.password && (
                      <FiCheck color="#08aa58" size={18} />
                    )}
                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <LuEye size={18} color="#f6b83d" />
                      ) : (
                        <LuEyeOff size={18} color="#f6b83d" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="span"
                    className={styles.errorText}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Log In
                </button>
              </Form>
            )}
          </Formik>

          <p className={styles.loginLink}>
            Don't have an account? <Link to="/register">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
