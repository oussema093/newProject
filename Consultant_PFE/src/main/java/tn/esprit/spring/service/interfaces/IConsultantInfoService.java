package tn.esprit.spring.service.interfaces;

import java.util.List;

import org.springframework.data.domain.Page;

import tn.esprit.spring.entity.Consultant;

public interface IConsultantInfoService {

	public Consultant addConsultant(Consultant c);
	public Consultant updateConsultant(Consultant c);
	public void deleteConsultant(Consultant c);
	public Consultant activerConsultant(Long consultantid);
	public Consultant desactiverConsultant(Long consultantid);
	public Consultant getConsultantByID(Long consultantid);
	public List<Consultant>getAllConsultants();
    public Page <Consultant> chercher(String mc,int page,int size) ;
    public Consultant getConsultantbyLogin(String login);
    
    /******************************************************************/
    public Consultant save(Consultant c);
    public Consultant findByLogin(String login);
   
public Consultant payer(long userId);





}
