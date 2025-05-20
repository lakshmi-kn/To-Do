package com.todolist.backend;
public class Task {
    private int id;
    private String title;

    public Task() {}

    public Task(int id, String title) {
        this.id = id;
        this.title = title;
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public void setId(int id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
}
