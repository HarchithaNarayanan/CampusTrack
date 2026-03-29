package edu.infosys.lostFoundLocatorApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class FoundItem {

    @Id
    private String foundItemId;
    private String foundItemName;
    private String color;
    private String brand;
    private String category;
    private String location;
    private String username;
    private String foundDate;
    private Boolean status;

    @jakarta.persistence.Column(columnDefinition = "LONGTEXT")
    private String itemImage;

    private String department;
    private String yearOfStudy;

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public FoundItem() {
        super();
    }
    
    public FoundItem(String foundItemId, String foundItemName, String color, String brand, String category,
                     String location, String username, String foundDate, Boolean status, String itemImage, String department, String yearOfStudy) {
        super();
        this.foundItemId = foundItemId;
        this.foundItemName = foundItemName;
        this.color = color;
        this.brand = brand;
        this.category = category;
        this.location = location;
        this.username = username;
        this.foundDate = foundDate;
        this.status = status;
        this.itemImage = itemImage;
        this.department = department;
        this.yearOfStudy = yearOfStudy;
    }

    public FoundItem(String foundItemId, String foundItemName, String color, String brand, String category,
                     String location, String username, String foundDate, Boolean status, String department, String yearOfStudy) {
        super();
        this.foundItemId = foundItemId;
        this.foundItemName = foundItemName;
        this.color = color;
        this.brand = brand;
        this.category = category;
        this.location = location;
        this.username = username;
        this.foundDate = foundDate;
        this.status = status;
        this.department = department;
        this.yearOfStudy = yearOfStudy;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }
    
    public String getFoundItemId() {
        return foundItemId;
    }

    public void setFoundItemId(String foundItemId) {
        this.foundItemId = foundItemId;
    }

    
    public String getFoundItemName() {
        return foundItemName;
    }

    public void setFoundItemName(String foundItemName) {
        this.foundItemName = foundItemName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFoundDate() {
        return foundDate;
    }

    public void setFoundDate(String foundDate) {
        this.foundDate = foundDate;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}