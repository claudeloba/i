import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditName = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchName = async () => {
      const { data } = await axios.get(`http://localhost:4000/names/${id}`);
      setName(data.name);
      setAge(data.age);
      setGender(data.gender);
    };
    fetchName();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:4000/names/${id}`, {
      name,
      age,
      gender,
    });
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
        Save Changes
      </button>
    </form>
  );
};

export default EditName;
