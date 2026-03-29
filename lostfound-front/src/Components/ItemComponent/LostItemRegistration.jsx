import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { getUser } from "../../Services/LoginService";
import { generateLostItemId, saveLostItem } from "../../Services/LostItemService";

const LostItemRegistration = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  let [newId, setNewId] = useState("");
  let [ldate, setLdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [lostItem, setLostItem] = useState({
    lostItemId: "", lostItemName: "", color: "", brand: "",
    category: "", location: "", username: "", lostDate: new Date(), status: false, itemImage: "",
    department: "", yearOfStudy: ""
  });
  const [itemImage, setItemImage] = useState("");

  useEffect(() => {
    generateLostItemId().then((r) => setNewId(r.data));
    getUser().then((r) => {
      setUserId(r.data.username);
      setUserProfile(r.data);
    });
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist(); setFlag(false);
    const { name, value } = event.target;
    setLostItem(v => ({ ...v, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {}; let isValid = true;
    if (!lostItem.lostItemName.trim()) { tempErrors.lostItemName = "Item Name is required"; isValid = false; }
    if (!lostItem.color.trim()) { tempErrors.color = "Color is required"; isValid = false; }
    if (!lostItem.brand.trim()) { tempErrors.brand = "Brand is required"; isValid = false; }
    if (!lostItem.category.trim()) { tempErrors.category = "Category is required"; isValid = false; }
    if (!lostItem.location.trim()) { tempErrors.location = "Location is required"; isValid = false; }
    setErrors(tempErrors);
    if (isValid) {
      lostItem.lostItemId = newId;
      lostItem.username = userId;
      lostItem.lostDate = ldate;
      lostItem.itemImage = itemImage;
      lostItem.department = userProfile.department || "";
      lostItem.yearOfStudy = userProfile.yearOfStudy || "";
      saveLostItem(lostItem).then(() => setFlag(true));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAll = () => {
    setLostItem({ lostItemId: "", lostItemName: "", color: "", brand: "", category: "", location: "", username: "", lostDate: new Date(), status: false, itemImage: "", department: "", yearOfStudy: "" });
    setLdate("");
    setItemImage("");
  };

  return (
    <div className="ct-page">
      <div className="ct-card">
        <div className="ct-title">📦 Lost Item Report</div>

        <div className="ct-form-group">
          <label>Item ID (Auto)</label>
          <input value={newId} readOnly />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="ct-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Lost Item Name</label>
            <input name="lostItemName" placeholder="e.g. Black Watch" value={lostItem.lostItemName} onChange={onChangeHandler} />
            {errors.lostItemName && <span className="ct-error">{errors.lostItemName}</span>}
          </div>
          <div className="ct-form-group">
            <label>Category</label>
            <input name="category" placeholder="e.g. Accessories" value={lostItem.category} onChange={onChangeHandler} />
            {errors.category && <span className="ct-error">{errors.category}</span>}
          </div>
          <div className="ct-form-group">
            <label>Color</label>
            <input name="color" placeholder="e.g. Black" value={lostItem.color} onChange={onChangeHandler} />
            {errors.color && <span className="ct-error">{errors.color}</span>}
          </div>
          <div className="ct-form-group">
            <label>Brand</label>
            <input name="brand" placeholder="e.g. Titan" value={lostItem.brand} onChange={onChangeHandler} />
            {errors.brand && <span className="ct-error">{errors.brand}</span>}
          </div>
          <div className="ct-form-group">
            <label>Lost Location</label>
            <input name="location" placeholder="e.g. Canteen" value={lostItem.location} onChange={onChangeHandler} />
            {errors.location && <span className="ct-error">{errors.location}</span>}
          </div>
          <div className="ct-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Lost Date</label>
            <input type="date" value={ldate} onChange={(e) => setLdate(e.target.value)} />
          </div>
          <div className="ct-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Upload Item Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {itemImage && <img src={itemImage} alt="Preview" style={{ marginTop: '10px', maxHeight: '100px', borderRadius: '8px' }} />}
          </div>
        </div>

        {flag && <div className="ct-success-msg">✅ Lost item reported successfully!</div>}

        <div className="ct-btn-group" style={{ marginTop: '20px' }}>
          <button className="ct-btn ct-btn-primary" onClick={handleValidation}>Submit</button>
          <button className="ct-btn ct-btn-gold" onClick={clearAll}>Clear</button>
          <button className="ct-btn ct-btn-green" onClick={() => navigate("/student-menu")}>Return</button>
        </div>
      </div>
    </div>
  );
};

export default LostItemRegistration;
