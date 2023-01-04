import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ViewNames = () => {
  const [names, setNames] = useState([]);
  const [sort, setSort] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [genderFilter, setGenderFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNames = async () => {
      const { data } = await axios.get("http://localhost:4000/names");
      setNames(data);
    };
    fetchNames();
  }, []);

  const handleEdit = (name) => {
    navigate(`/edit-name/${name.id}`);
  };

  const handleDelete = async (name) => {
    await axios.delete(`http://localhost:4000/names/${name.id}`);
    const updatedNames = names.filter((n) => n.id !== name.id);
    setNames(updatedNames);
  };

  const toggleSortBy = () => {
    if (sortBy === "name") {
      setSortBy("age");
    } else {
      setSortBy("name");
    }
  };

  const filteredNames = names.filter((name) => {
    if (genderFilter === "all") {
      return true;
    }
    return name.gender === genderFilter;
  });

  const sortedNames = filteredNames.sort((a, b) => {
    if (sortBy === "name") {
      if (sort === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    }
    if (sort === "asc") {
      return a.age - b.age;
    }
    return b.age - a.age;
  });

  return (
    <div className="viewname_container">
      <div className="filter">
        <label className="filter__label" htmlFor="sort">
          Sort:
        </label>
        <select
          className="filter__dropdown"
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <label className="filter__label" htmlFor="sort-by">
          Sort by:
        </label>
        <select
          className="filter__dropdown"
          id="sort-by"
          value={sortBy}
          onChange={toggleSortBy}
        >
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
        <label className="filter__label" htmlFor="gender-filter">
          Filter by gender:
        </label>
        <select
          className="filter__dropdown"
          id="gender-filter"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="people">
        {sortedNames.map((name) => (
          <figure className="people__figure" key={name.id}>
            <img
              className="people__figure__img"
              src={`https://randomuser.me/api/portraits/${
                name.gender === "male" ? "men" : "women"
              }/${name.id}.jpg`}
              alt={name.name}
            />
            <figcaption className="people__figure__cap">
              <p className="person_info">Name: {name.name}</p>
              <p className="person_info">Gender: {name.gender}</p>
              <p className="person_info">Age: {name.age}</p>
            </figcaption>
            <div className="person_btn-container">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.2 }}
                className="person_btn"
                onClick={() => handleEdit(name)}
              >
                Edit
              </motion.button>
              <button className="person_btn" onClick={() => handleDelete(name)}>
                Delete
              </button>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default ViewNames;
