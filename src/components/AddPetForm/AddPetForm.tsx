import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPet } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";
import { LuChevronDown } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import styles from "./AddPetForm.module.css";

const PetSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  species: Yup.string().required("Species is required"),
  birthday: Yup.string()
    .required("Birthday is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD")
    .test("is-not-future", "Date cannot be in the future", (value) => {
      if (!value) return false;
      const today = new Date();
      const inputDate = new Date(value);
      return inputDate <= today;
    }),
});

interface AddPetFormProps {
  onBack: () => void;
}

interface PetFormValues {
  sex: string;
  imgURL: string | File;
  title: string;
  name: string;
  birthday: string;
  species: string;
}

export default function AddPetForm({ onBack }: AddPetFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = async (values: PetFormValues) => {
    if (!values.imgURL) {
      alert("Please upload a photo of your pet!");
      return;
    }

    try {
      await dispatch(addPet(values)).unwrap();
      navigate("/profile");
    } catch (error) {
      console.error("Failed to add pet:", error);
    }
  };

  return (
    <Formik<PetFormValues>
      initialValues={{
        sex: "female",
        imgURL: "",
        title: "",
        name: "",
        birthday: "",
        species: "",
      }}
      validationSchema={PetSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <div className={styles.formContainer}>
          <Form className={styles.form}>
            <h2 className={styles.title}>
              Add my pet/
              <span className={styles.subtitle}>Personal details</span>
            </h2>

            <div className={styles.sexContainer}>
              {["female", "male", "multiple"].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  className={`${styles.sexBtn} ${styles[gender]} ${
                    values.sex === gender
                      ? styles[
                          `active${gender.charAt(0).toUpperCase() + gender.slice(1)}`
                        ]
                      : ""
                  }`}
                  onClick={() => setFieldValue("sex", gender)}
                >
                  <svg className={styles.sexIcon}>
                    <use href={`/sprite.svg#icon-${gender}`} />
                  </svg>
                </button>
              ))}
            </div>

            <div
              className={styles.avatarPlaceholder}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className={styles.pawCircle}>
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                ) : (
                  <svg className={styles.pawIcon}>
                    <use href="/sprite.svg#icon-footprint" />
                  </svg>
                )}
              </div>
            </div>

            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  setFieldValue("imgURL", file);
                  const url = URL.createObjectURL(file);
                  setPreviewUrl(url);
                }
              }}
            />
            <div className={styles.inputRow}>
              <Field
                name="imgURL"
                placeholder="Enter URL or upload photo"
                className={styles.input}
                value={
                  values.imgURL instanceof File
                    ? values.imgURL.name
                    : values.imgURL
                }
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

            <Field name="title" placeholder="Title" className={styles.input} />
            <Field
              name="name"
              placeholder="Pet's Name"
              className={styles.input}
            />

            <div className={styles.inputRow}>
              <div className={styles.dateWrapper}>
                <Field
                  name="birthday"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  className={`${styles.input} ${errors.birthday && touched.birthday ? styles.inputError : ""}`}
                />
              </div>

              <div className={styles.selectWrapper}>
                <Field
                  as="select"
                  name="species"
                  className={`${styles.input} ${styles.select}`}
                >
                  <option value="" disabled>
                    Type of pet
                  </option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="monkey">Monkey</option>
                  <option value="bird">Bird</option>
                </Field>
                <LuChevronDown className={styles.selectArrow} size={18} />
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={onBack} className={styles.backBtn}>
                Back
              </button>
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
