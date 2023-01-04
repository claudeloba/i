import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddName = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/names", { name, age, gender });
    navigate("/view-names");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="name">
        Name:
      </label>
      <input
        className="form__input"
        type="text"
        id="name"
        value={name}
        placeholder="Enter a name..."
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label className="form__label" htmlFor="age">
        Age:
      </label>
      <input
        className="form__input"
        type="number"
        id="age"
        value={age}
        placeholder="Enter an age..."
        onChange={(e) => setAge(e.target.value)}
      />
      <br />
      <label className="form__label" htmlFor="gender">
        Gender:
      </label>
      <select
        className="form__dropdown"
        id="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br />
      <button className="form__btn" type="submit">
        Add Name
      </button>
    </form>
  );
};

export default AddName;
