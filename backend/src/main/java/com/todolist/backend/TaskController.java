package com.todolist.backend;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class TaskController {
    private List<Task> tasks = new ArrayList<>();
    private int idCounter = 1;

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return tasks;
    }

    @PostMapping("/tasks")
    public Task addTask(@RequestBody Task task) {
        task.setId(idCounter++);
        tasks.add(task);
        return task;
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable int id) {
        tasks.removeIf(task -> task.getId() == id);
    }
}
