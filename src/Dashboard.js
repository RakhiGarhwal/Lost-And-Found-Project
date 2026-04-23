import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  // fetch items
  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then(res => setItems(res.data));
  }, []);

  // add item
  const addItem = async () => {
    await axios.post("http://localhost:5000/api/items", {
  itemName: name,
  description: desc
});
    window.location.reload();
  };

 return (
  <div className="container">
    <h2>📦 Lost & Found Dashboard</h2>

    <h3>Add Item</h3>
    <input
      placeholder="Item Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <input
      placeholder="Description"
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
    />
    <button onClick={addItem}>Add Item</button>

    <h3>All Items</h3>
    {items.map((item) => (
      <div className="item" key={item._id}>
        <strong>{item.itemName}</strong>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
);
}