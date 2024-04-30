import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responsee = await axios.post("http://localhost:8000/todo", {
        title,
        description,
      });
      if (responsee.status === 201) {
        console.log("Data submitted");
        setTitle("");
        setDescription("");
        setCurrentData((prevData) => [
          ...prevData,
          {
            title,
            description,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getting_data = async () => {
    const response = await axios.get("http://localhost:8000/todo");
    setCurrentData(response.data.data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/todo/${id}`);
      if (response.status === 200) {
        console.log("Data deleted");
        setCurrentData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, newTitle, newDescription) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/todo/${editingItem._id}`,
        {
          title: newTitle,
          description: newDescription,
        }
      );

      if (response.status === 200) {
        setCurrentData((prevData) =>
          prevData.map((item) =>
            item._id === id
              ? { ...item, title: newTitle, description: newDescription }
              : item
          )
        );
      }

      setEditingItem(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditingItem(item);
  };

  useEffect(() => {
    getting_data();
  }, []);

  return (
    <>
      <center>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        {editingItem && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingItem._id, title, description); // Pass the necessary arguments
            }}
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        )}

        <div className="todo_list">
          {currentData.map((data, index) => (
            <div key={index} style={{ border: "1px solid black" }}>
              <p>
                <b>{data.title}</b>
              </p>
              <p>{data.description}</p>
              <button onClick={() => handleDelete(data._id)}>Delete</button>
              <button onClick={() => handleEdit(data)}>Edit</button>
            </div>
          ))}
        </div>
      </center>
    </>
  );
};

export default App;
