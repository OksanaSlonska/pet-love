import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPet } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";
import { LuChevronDown, LuCalendar } from "react-icons/lu";
import styles from "./AddPetForm.module.css";

interface AddPetFormProps {
  onBack: () => void;
}

interface PetFormValues {
  sex: string;
  imgURL: string;
  title: string;
  name: string;
  birthday: string;
  species: string;
}

export default function AddPetForm({ onBack }: AddPetFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (values: PetFormValues) => {
    const petData = {
      title: values.title,
      name: values.name,
      birthday: values.birthday,
      species: values.species,
      sex: values.sex,
      imgURL: values.imgURL,
    };
    try {
      await dispatch(addPet(petData)).unwrap();

      navigate("/profile");
    } catch (error) {
      console.error("Failed to add pet:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        sex: "female",
        imgURL: "",
        title: "",
        name: "",
        birthday: "",
        species: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
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

            <div className={styles.avatarPlaceholder}>
              <div className={styles.pawCircle}>
                <svg className={styles.pawIcon}>
                  <use href="/sprite.svg#icon-footprint" />
                </svg>
              </div>
            </div>

            <div className={styles.inputRow}>
              <Field
                name="imgURL"
                placeholder="Enter URL"
                className={styles.input}
              />
              <button type="button" className={styles.uploadBtn}>
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
                  placeholder="0000-00-00"
                  className={styles.input}
                />
                <LuCalendar className={styles.calendarIcon} size={18} />
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
