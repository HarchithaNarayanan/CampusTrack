import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { getUser } from "../../Services/LoginService";
import { generateFoundItemId, saveFoundItem } from "../../Services/FoundItemService";

const FoundItemRegistration = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  let [newId, setNewId] = useState("");
  let [fdate, setFdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [foundItem, setFoundItem] = useState({
    foundItemId: "", foundItemName: "", color: "", brand: "",
    category: "", location: "", username: "", foundDate: new Date(), status: false, itemImage: "",
    department: "", yearOfStudy: ""
  });
  const [itemImage, setItemImage] = useState("");

  useEffect(() => {
    generateFoundItemId().then((r) => setNewId(r.data));
    getUser().then((r) => {
      setUserId(r.data.username);
      setUserProfile(r.data);
    });
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist(); setFlag(false);
    const { name, value } = event.target;
    setFoundItem(v => ({ ...v, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {}; let isValid = true;
    if (!foundItem.foundItemName.trim()) { tempErrors.foundItemName = "Item Name is required"; isValid = false; }
    if (!foundItem.color.trim()) { tempErrors.color = "Color is required"; isValid = false; }
    if (!foundItem.brand.trim()) { tempErrors.brand = "Brand is required"; isValid = false; }
    if (!foundItem.category.trim()) { tempErrors.category = "Category is required"; isValid = false; }
    if (!foundItem.location.trim()) { tempErrors.location = "Location is required"; isValid = false; }
    setErrors(tempErrors);
    if (isValid) {
      foundItem.foundItemId = newId;
      foundItem.username = userId;
      foundItem.foundDate = fdate;
      foundItem.itemImage = itemImage;
      foundItem.department = userProfile.department || "";
      foundItem.yearOfStudy = userProfile.yearOfStudy || "";
      saveFoundItem(foundItem).then(() => setFlag(true));
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
    setFoundItem({ foundItemId: "", foundItemName: "", color: "", brand: "", category: "", location: "", username: "", foundDate: new Date(), status: false, itemImage: "", department: "", yearOfStudy: "" });
    setFdate("");
    setItemImage("");
  };

  return (
    <div className="ct-page">
      <div className="ct-card">
        <div className="ct-title">🔍 Found Item Report</div>

        <div className="ct-form-group">
          <label>Item ID (Auto)</label>
          <input value={newId} readOnly />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="ct-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Found Item Name</label>
            <input name="foundItemName" placeholder="e.g. Blue Bag" value={foundItem.foundItemName} onChange={onChangeHandler} />
            {errors.foundItemName && <span className="ct-error">{errors.foundItemName}</span>}
          </div>
          <div className="ct-form-group">
            <label>Category</label>
            <input name="category" placeholder="e.g. Bag" value={foundItem.category} onChange={onChangeHandler} />
            {errors.category && <span className="ct-error">{errors.category}</span>}
          </div>
          <div className="ct-form-group">
            <label>Color</label>
            <input name="color" placeholder="e.g. Blue" value={foundItem.color} onChange={onChangeHandler} />
            {errors.color && <span className="ct-error">{errors.color}</span>}
          </div>
          <div className="ct-form-group">
            <label>Brand</label>
            <input name="brand" placeholder="e.g. Nike" value={foundItem.brand} onChange={onChangeHandler} />
            {errors.brand && <span className="ct-error">{errors.brand}</span>}
          </div>
          <div className="ct-form-group">
            <label>Found Location</label>
            <input name="location" placeholder="e.g. Library" value={foundItem.location} onChange={onChangeHandler} />
            {errors.location && <span className="ct-error">{errors.location}</span>}
          </div>
          <div className="ct-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Found Date</label>
            <input type="date" value={fdate} onChange={(e) => setFdate(e.target.value)} />
          </div>
          <div className="ct-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Upload Item Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {itemImage && <img src={itemImage} alt="Preview" style={{ marginTop: '10px', maxHeight: '100px', borderRadius: '8px' }} />}
          </div>
        </div>

        {flag && <div className="ct-success-msg">✅ Found item reported successfully!</div>}

        <div className="ct-btn-group" style={{ marginTop: '20px' }}>
          <button className="ct-btn ct-btn-primary" onClick={handleValidation}>Submit</button>
          <button className="ct-btn ct-btn-gold" onClick={clearAll}>Clear</button>
          <button className="ct-btn ct-btn-green" onClick={() => navigate("/student-menu")}>Return</button>
        </div>
      </div>
    </div>
  );
};

export default FoundItemRegistration;
