package tn.esprit.spring.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import tn.esprit.spring.entity.Client;
import tn.esprit.spring.repository.ClientRepository;
import tn.esprit.spring.service.interfaces.IClient;
@Component
public class ClientService implements IClient{
	@Autowired 
	ClientRepository cr;

	@Override
	public Client addClient(Client c) {
		// TODO Auto-generated method stub
		return cr.save(c);
	}

}
