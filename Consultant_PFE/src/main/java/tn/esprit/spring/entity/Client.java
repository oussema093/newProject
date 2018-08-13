package tn.esprit.spring.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;

import javax.persistence.OneToMany;


@Entity
public class Client extends User implements Serializable{


	
	private Boolean etat;
	@OneToMany(mappedBy="client")
	private List<RecommanderConsultant>listrecommandation;
	private static final long serialVersionUID = 1L;
	
	

	public Client() {
		super();
	}
	public Client(String nom, String prenom, Date dateNaissance, String email,String userName, String password,String role,String photo,Boolean etat) {
		super(nom,prenom,dateNaissance,email,userName,password,role,photo);
		this.etat = etat;
	}
	public Boolean getEtat() {
		return etat;
	}
	public void setEtat(Boolean etat) {
		this.etat = etat;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
