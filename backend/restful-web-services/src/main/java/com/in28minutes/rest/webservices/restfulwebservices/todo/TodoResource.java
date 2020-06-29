package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoResource {
	
	@Autowired
	private TodoHardcodedService todoService;
	
	//retrieve all items
	@GetMapping("/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username) {
		return todoService.findAll();
	}
	
	//retrieve one item
	@GetMapping("/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id) {
		return todoService.findById(id);
	}
		
	//delete an item
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
		Todo todo = todoService.deleteById(id);
		
		if(todo != null) {
			return ResponseEntity.noContent().build(); // returns no content if its a success
		}
		
		return ResponseEntity.notFound().build(); //if failed it will return not found(404)
	}
	
	//update an item
	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodos(@PathVariable String username, 
			@PathVariable long id, @RequestBody Todo todo) {
		
		Todo todoUpdated = todoService.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}
	
	//insert an item
	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Void> updateTodos(@PathVariable String username, @RequestBody Todo todo) {
		
		Todo createdTodo = todoService.save(todo);
		
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
