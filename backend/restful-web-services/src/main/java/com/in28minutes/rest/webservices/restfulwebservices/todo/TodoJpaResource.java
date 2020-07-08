package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoJpaResource {
	
	@Autowired
	private TodoHardcodedService todoService;
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;
	
	//retrieve all items
	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username) {
		return todoJpaRepository.findByUsername(username);
		//return todoService.findAll();
	}
	
	//retrieve one item
	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id) {
		return todoJpaRepository.findById(id).get();
		//return todoService.findById(id);
	}
		
	//delete an item
	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
		todoJpaRepository.deleteById(id);
		
		return ResponseEntity.noContent().build(); // returns no content if its a success		
	}
	
	//update an item
	@PutMapping("/jap/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, 
			@PathVariable long id, @RequestBody Todo todo) {
		
		todo.setUsername(username);
		
		Todo todoUpdated = todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}
	
	//insert an item
	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todo todo) {
		
		todo.setUsername(username);
		
		Todo createdTodo = todoJpaRepository.save(todo);
		
		//we need to return the location(url) of the created resource
		//Get current resource url
		//{id}
		
		//append this path(/{id}) to the current url
		//then pass my createdTodo resource to it
		//and we receive the uri
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				 .buildAndExpand(createdTodo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
}
