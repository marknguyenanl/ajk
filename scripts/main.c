#include "lib/db.h"
#include <dirent.h>
#include <stdio.h>
#include <string.h>
#include <time.h>
#include <unistd.h>

// Function prototypes
void listTasks();
void addTask();

int main() {
  char input[10];
  char title[200];
  int id = 10;
  printf("Welcome to ajk-task-breaker\n");
  while (1) {
    printf("What would you like to do?\n");
    printf("a. Capture a task\n");
    printf("d. Delete a task\n");
    printf("l. List tasks\n");
    printf("q. Quit program\n");
    scanf("%9s", input);

    switch (input[0]) {
    case 'a':
      printf("Entered id: ");
      scanf("%d", &id);
      printf("Enter task title: ");
      getchar();
      fgets(title, sizeof(title), stdin);
      title[strcspn(title, "\n")] = 0;
      addTaskToList(id, title);
      printf("Task ID:%d; Title:%s\n", id, title);
      break;
    case 'd':
      deleteTaskFromList(id);
      break;
    case 'l':
      listTasksFromList();
      break;
    case 'q':
      return 0;
      break;
    default:
      printf("Invalid option\n");
      break;
    }
  }

  return 0;
}

void listTasks() {
  DIR *dir;
  struct dirent *ent;
  if ((dir = opendir("db")) != NULL) {
    while ((ent = readdir(dir)) != NULL) {
      if (ent->d_type == DT_REG) { // Check if it's a regular file
        char filepath[300];
        snprintf(filepath, sizeof(filepath), "db/%s", ent->d_name);
        printf("Task file: %s\n", ent->d_name);
        printf("\n");
      }
    }
    closedir(dir);
  } else {
    perror("Could not open directory");
  }
}
