package com.in28minutes.rest.webservices.restfulwebservices.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//Controller
@RestController
@CrossOrigin(origins="http://localhost:4200") //enabled accessing other servers
public class BasicAuthenticationController {
	
	//hello-world-bean
	@GetMapping(path="/basicauth")
	public AuthenticationBean helloWorldBean() {
		return new AuthenticationBean("You are authenticated");
	}
	
}
