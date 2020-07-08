package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardcodedService {
	
	//this would act as our database
	private static List<Todo> todos = new ArrayList<>(); 
	
	private static long idCounter = 0;
	
	
	//initializing data
	static {
		todos.add(new Todo(++idCounter, "in28mintues", "Learn to dance", new Date(), false));
		todos.add(new Todo(++idCounter, "in28mintues", "Learn about Angular", new Date(), false));
		todos.add(new Todo(++idCounter, "in28mintues", "Learn English", new Date(), false));
	}
	
	//retrieve all todos
	public List<Todo> findAll() {
		return todos;
	}
	
	//insert & update data
	public Todo save(Todo todo) {
		if(todo.getId() == -1 || todo.getId() == 0) {
			//if true, do an insert - add this item to the list 
			todo.setId(++idCounter);
			todos.add(todo);
			
		} else {
			//if false, do an update - delete the current item and add the new item
			deleteById(todo.getId());
			todos.add(todo);			
		}
		return todo;
	}
	
	

	//find user by Id
	public Todo findById(long id) {		
		for(Todo todo:todos) {
			if(todo.getId() == id) {
				return todo;
			}
		}
		return null;
	}

	//find user and delete
	public Todo deleteById(long id) {
		Todo todo = findById(id);
		
		if(todo == null) return null;
		
		
		if(todos.remove(todo)) {			
			return todo;
		}
		return null;
	}

}
