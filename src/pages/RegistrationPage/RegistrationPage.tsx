import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FiX, FiCheck } from "react-icons/fi";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";

import type { AppDispatch } from "../../redux/store";
import styles from "./RegistrationPage.module.css";

const registerSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short!").required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function RegistrationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values: RegisterFormValues) => {
    const { confirmPassword: _, ...dataForServer } = values;
    void _;

    const finalData = {
      ...dataForServer,
      email: dataForServer.email.trim().toLowerCase(),
    };

    dispatch(register(finalData));
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageWrapper}>
        <div className={styles.imageSection}>
          <picture>
            <source
              media="(min-width: 1280px)"
              srcSet="/images/cat-desktop-1x.webp 1x, /images/cat-desktop-2x.webp 2x"
              type="image/webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/images/cat-tablet-1x.webp 1x, /images/cat-tablet-2x.webp 2x"
              type="image/webp"
            />
            <source
              srcSet="/images/cat-mobile-1x.webp 1x, /images/cat-mobile-2x.webp 2x"
              type="image/webp"
            />
            <img
              src="/images/cat-mobile-1x.webp"
              alt="Cute orange cat"
              className={styles.catImg}
              loading="lazy"
            />
          </picture>

          <div className={styles.petCard}>
            <div className={styles.petAvatar}>
              <img src="/favicon.png" alt="Jack" />
            </div>
            <div className={styles.petInfo}>
              <div className={styles.petHeader}>
                <h3 className={styles.petName}>Jack</h3>
                <p className={styles.petBirthday}>
                  Birthday: <span>18.10.2021</span>
                </p>
              </div>
              <p className={styles.petDesc}>
                Jack is a gray Persian cat with green eyes. He loves to be
                pampered and groomed.
              </p>
            </div>
          </div>
        </div>

        {/* Правая секция с формой */}
        <div className={styles.formSection}>
          <h2 className={styles.title}>Registration</h2>
          <p className={styles.text}>
            Thank you for your interest in our platform.
          </p>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className={styles.form}>
                {/* --- Name --- */}
                <div className={styles.inputWrapper}>
                  <Field
                    name="name"
                    placeholder="Name"
                    className={`${styles.input} ${
                      touched.name && errors.name
                        ? styles.inputError
                        : touched.name && !errors.name
                          ? styles.inputSuccess
                          : ""
                    }`}
                  />
                  <div className={styles.iconWrapper}>
                    {touched.name && errors.name ? (
                      <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={() => setFieldValue("name", "")}
                      >
                        <FiX color="#ef2447" size={18} />
                      </button>
                    ) : touched.name && !errors.name ? (
                      <FiCheck color="#08aa58" size={18} />
                    ) : null}
                  </div>
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={styles.errorText}
                  />
                </div>

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

                {/* --- Confirm Password --- */}
                <div className={styles.inputWrapper}>
                  <Field
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className={`${styles.input} ${
                      touched.confirmPassword && errors.confirmPassword
                        ? styles.inputError
                        : touched.confirmPassword && !errors.confirmPassword
                          ? styles.inputSuccess
                          : ""
                    }`}
                  />
                  <div className={styles.iconWrapper}>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <FiX color="#ef2447" size={18} />
                    )}
                    {touched.confirmPassword && !errors.confirmPassword && (
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
                    name="confirmPassword"
                    component="span"
                    className={styles.errorText}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Registration
                </button>
              </Form>
            )}
          </Formik>

          <p className={styles.loginLink}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
