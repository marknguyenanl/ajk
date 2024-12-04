#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void addTaskToList(int id, const char *title);
typedef struct Task {
  int id;
  char title[100];
  struct Task *next;
} Task;

Task *head = NULL;

/* TODO: (use addTaskToLinkList to enable db type option in setting of app) */
void addTaskToList(int id, const char *title) {
  Task *newTask = (Task *)malloc(sizeof(Task));
  newTask->id = id;
  strncpy(newTask->title, title, sizeof(newTask->title) - 1);
  newTask->title[sizeof(newTask->title) - 1] = '\0';
  newTask->next = head;
  head = newTask;
}

void deleteTaskFromList(int id) {
  Task *current = head;
  Task *previous = NULL;

  while (current != NULL && current->id != id) {
    previous = current;
    current = current->next;
  }

  if (current == NULL) {
    printf("Task with ID %d not found\n", id);
    return;
  }

  if (previous == NULL) {
    head = current->next;
  } else {
    previous->next = current->next;
  }

  free(current);
}

void listTasksFromList() {
  Task *current = head;
  while (current != NULL) {
    printf("Task ID: %d, Title: %s\n", current->id, current->title);
    current = current->next;
  }
}
