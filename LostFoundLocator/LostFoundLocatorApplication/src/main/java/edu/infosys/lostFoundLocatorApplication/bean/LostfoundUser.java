package edu.infosys.lostFoundLocatorApplication.bean;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.*;
@Entity 
public class LostfoundUser extends User{
	@Id
private String username;
private String password;
private String personalName;
private String email;
private String role;
private String department;
private String yearOfStudy;
public LostfoundUser() {
	super("abc","pqr",new ArrayList<>());
	
	
}
public LostfoundUser(String username, String password, Collection<? extends GrantedAuthority> authorities,
		String username2, String personalName2,String email2, String password2, String role2, String department, String yearOfStudy) {
	super(username, password, authorities);
	this.username = username2;
	this.password = password2;
	this.personalName = personalName2;
	this.email = email2;
	this.role = role2;
	this.department = department;
	this.yearOfStudy = yearOfStudy;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getPersonalName() {
	return personalName;
}
public void setPersonalName(String personalName) {
	this.personalName = personalName;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getRole() {
	return role;
}
public void setRole(String role) {
	this.role = role;
}
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


}
