package tn.esprit.spring.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import tn.esprit.spring.entity.Consultant;
import tn.esprit.spring.entity.User;
import tn.esprit.spring.repository.ConsultantRepository;
import tn.esprit.spring.service.interfaces.IConsultantInfoService;

@Component
public class ConsultantInfoMySQLServiceImpl implements IConsultantInfoService{
	@Autowired
	ConsultantRepository cons;
    byte[] bytesArray = null;


	@Override
	public Consultant addConsultant(Consultant c) {
		if (c.getPhoto()!=null)
		{
		  File f=new File(c.getPhoto());
           bytesArray = new byte[(int) f.length()];

           //Pour que l'objetFileInputStream fonctionne, le fichier doit exister ! Sinon l'exceptionFileNotFoundExceptionest levée
          try {
			FileInputStream fis = new FileInputStream(f);
            try {
				fis.read(bytesArray);
				c.setImg(bytesArray);
				return cons.save(c);

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

	
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		}
		return cons.save(c);
	}

	@Override
	public Consultant updateConsultant(Consultant c) {

	
		return cons.save(c);
		
	}

	@Override
	public void deleteConsultant(Consultant c) {

		cons.delete(c);
	}

	@Override
	public Consultant activerConsultant(Long  consultantid) {
		Consultant c=new Consultant();
		c=getConsultantByID(consultantid);
c.setEtat(true);	
return cons.save(c);
	}

	@Override
	public Consultant desactiverConsultant(Long  consultantid) {
		Consultant c=new Consultant();
		c=getConsultantByID(consultantid);
		c.setEtat(false);	
		return cons.save(c);		
	}

	@Override
	public Consultant getConsultantByID(Long consultantid) {
		return cons.findOne(consultantid);
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Consultant> getAllConsultants() {
List<Consultant>consultants=new ArrayList<>();
cons.findAll().forEach(consultants::add);
		
		return consultants;
	}

	@Override
	public Page<Consultant> chercher(String mc, int page, int size) {
		// TODO Auto-generated method stub
		return cons.chercher("%"+mc+"%", new PageRequest(page, size));
	}

	@Override
	public Consultant save(Consultant c) {
		// TODO Auto-generated method stub
		return cons.save(c);
	}

	@Override
	public Consultant findByLogin(String login) {
		//rien
		return cons.findByUserName(login);
	}

	@Override
	public Consultant getConsultantbyLogin(String login) {
		return cons.getConsultantbyLogin(login);
	}

	@Override
	public Consultant payer(long userId) {
Consultant c=cons.findOne(userId);
System.out.println("xxxxxxxxdddddddddd   "+c.getSalaire());

c.setSalaire(c.getSalaire()-10);
		return cons.save(c);
	}
	
	
	

}
